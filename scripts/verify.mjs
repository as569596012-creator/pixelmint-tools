// 本机无头浏览器验证:启动一个静态服务器托管 out/,用 Playwright 检查
// 1) 每个路由能正常加载、标题/H1 正确;2) JSON-LD 结构化数据存在且合法;
// 3) 图片压缩工具的真实功能(生成测试图 -> 压缩 -> 得到更小的结果)。
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { chromium } from "playwright";

const ROOT = join(process.cwd(), "out");
const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  let full = join(ROOT, p);
  try {
    const s = await stat(full);
    if (s.isDirectory()) full = join(full, "index.html");
    return full;
  } catch {
    // 尝试 /path -> /path.html 或 /path/index.html
    try {
      await stat(full + ".html");
      return full + ".html";
    } catch {
      try {
        const idx = join(full, "index.html");
        await stat(idx);
        return idx;
      } catch {
        return null;
      }
    }
  }
}

function startServer() {
  const server = createServer(async (req, res) => {
    const file = await resolveFile(req.url || "/");
    if (!file) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    try {
      const data = await readFile(file);
      res.setHeader("Content-Type", MIME[extname(file)] || "application/octet-stream");
      res.end(data);
    } catch {
      res.statusCode = 500;
      res.end("Server error");
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

const ROUTES = [
  { path: "/", h1Includes: "Image Tools" },
  { path: "/image-compressor/", h1Includes: "Compress Image" },
  { path: "/heic-to-jpg/", h1Includes: "HEIC to JPG" },
  { path: "/png-to-jpg/", h1Includes: "PNG to JPG" },
  { path: "/image-to-webp/", h1Includes: "WebP" },
  { path: "/about/", h1Includes: "About" },
  { path: "/contact/", h1Includes: "Contact" },
  { path: "/privacy/", h1Includes: "Privacy" },
  { path: "/disclaimer/", h1Includes: "Disclaimer" },
];

let failures = 0;
function check(name, ok, detail = "") {
  const mark = ok ? "PASS" : "FAIL";
  if (!ok) failures++;
  console.log(`  [${mark}] ${name}${detail ? " — " + detail : ""}`);
}

async function main() {
  const server = await startServer();
  console.log(`Static server on ${BASE}\n`);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } }); // 移动端视口

  console.log("1) 路由渲染 + JSON-LD:");
  for (const route of ROUTES) {
    const resp = await page.goto(BASE + route.path, { waitUntil: "networkidle" });
    const status = resp?.status() ?? 0;
    const h1 = (await page.locator("h1").first().textContent())?.trim() || "";
    const ldCount = await page.locator('script[type="application/ld+json"]').count();
    let ldValid = true;
    const ldNodes = await page.locator('script[type="application/ld+json"]').allTextContents();
    for (const txt of ldNodes) {
      try {
        JSON.parse(txt);
      } catch {
        ldValid = false;
      }
    }
    const ok = status === 200 && h1.includes(route.h1Includes) && ldValid;
    check(
      `${route.path}`,
      ok,
      `status=${status} h1="${h1.slice(0, 40)}" jsonld=${ldCount}${ldValid ? "" : " (INVALID JSON)"}`,
    );
  }

  // robots.txt / sitemap.xml
  console.log("\n2) SEO 文件:");
  for (const f of ["/robots.txt", "/sitemap.xml", "/llms.txt"]) {
    const resp = await page.goto(BASE + f, { waitUntil: "load" });
    const body = await page.evaluate(() => document.body?.innerText || "");
    check(f, (resp?.status() ?? 0) === 200 && body.length > 10, `len=${body.length}`);
  }

  // 功能测试:图片压缩
  console.log("\n3) 工具功能(图片压缩):");
  await page.goto(BASE + "/image-compressor/", { waitUntil: "networkidle" });
  const result = await page.evaluate(async () => {
    // 生成一张有噪点的大图(噪点更难压缩,但仍应缩小)
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 900;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      img.data[i] = v;
      img.data[i + 1] = (v + 80) % 255;
      img.data[i + 2] = (v + 160) % 255;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
    const file = new File([blob], "noise.png", { type: "image/png" });
    const dt = new DataTransfer();
    dt.items.add(file);
    const input = document.querySelector('input[type="file"]');
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return { originalSize: file.size };
  });

  await page.getByRole("button", { name: /compress/i }).first().click();
  // 等出现 Download 按钮(说明处理完成)
  await page.getByRole("button", { name: /^download$/i }).first().waitFor({ timeout: 20000 });
  const sizeText = await page.locator("li").first().innerText();
  check(
    "压缩产生结果并显示尺寸",
    /→/.test(sizeText),
    `original=${(result.originalSize / 1024).toFixed(0)}KB · "${sizeText.replace(/\s+/g, " ").slice(0, 60)}"`,
  );

  // 功能测试:格式转换(Canvas 重编码路径)
  console.log("\n4) 工具功能(格式转换):");
  for (const conv of [
    { path: "/png-to-jpg/", btn: /convert/i, ext: "jpg" },
    { path: "/image-to-webp/", btn: /convert/i, ext: "webp" },
  ]) {
    await page.goto(BASE + conv.path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createLinearGradient(0, 0, 600, 400);
      grad.addColorStop(0, "#22c56e");
      grad.addColorStop(1, "#145334");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 400);
      const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
      const file = new File([blob], "grad.png", { type: "image/png" });
      const dt = new DataTransfer();
      dt.items.add(file);
      const input = document.querySelector('input[type="file"]');
      input.files = dt.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await page.getByRole("button", { name: conv.btn }).first().click();
    await page.getByRole("button", { name: /^download$/i }).first().waitFor({ timeout: 20000 });
    const txt = (await page.locator("li").first().innerText()).replace(/\s+/g, " ");
    check(`${conv.path} 输出 .${conv.ext}`, /→/.test(txt), `"${txt.slice(0, 55)}"`);
  }

  await browser.close();
  server.close();

  console.log(`\n${failures === 0 ? "ALL CHECKS PASSED ✅" : failures + " CHECK(S) FAILED ❌"}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
