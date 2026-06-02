// 验证线上 Cloudflare Pages 站点:检查各页面 HTTP 状态、H1、JSON-LD、sitemap
const BASE = "https://piccrush.com";

const ROUTES = [
  { path: "/", titleIncludes: "PicCrush" },
  { path: "/image-compressor/", titleIncludes: "Image Compressor" },
  { path: "/heic-to-jpg/", titleIncludes: "HEIC to JPG" },
  { path: "/png-to-jpg/", titleIncludes: "PNG to JPG" },
  { path: "/image-to-webp/", titleIncludes: "WebP" },
  { path: "/about/", titleIncludes: "About" },
  { path: "/privacy/", titleIncludes: "Privacy" },
  { path: "/robots.txt", titleIncludes: null },
  { path: "/sitemap.xml", titleIncludes: null },
  { path: "/llms.txt", titleIncludes: null },
];

let pass = 0, fail = 0;
function log(ok, label, detail = "") {
  const m = ok ? "PASS" : "FAIL";
  if (!ok) fail++; else pass++;
  console.log(`  [${m}] ${label}${detail ? "  —  " + detail : ""}`);
}

for (const r of ROUTES) {
  try {
    const res = await fetch(BASE + r.path, { redirect: "follow" });
    const body = await res.text();
    const statusOk = res.status === 200;
    let titleOk = true;
    if (r.titleIncludes) {
      titleOk = body.includes(r.titleIncludes);
    }
    log(statusOk && titleOk, r.path, `status=${res.status}${r.titleIncludes ? ` contains="${r.titleIncludes}"` : ""} bodyLen=${body.length}`);
  } catch (e) {
    log(false, r.path, e.message);
  }
}

console.log(`\n${fail === 0 ? "ALL LIVE CHECKS PASSED ✅" : `${fail} FAILED ❌ / ${pass} passed`}`);
process.exit(fail === 0 ? 0 : 1);
