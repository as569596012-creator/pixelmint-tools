# PixelMint — 免费在线图片工具站（靠海外搜索流量赚钱）

一个用 **Next.js 静态导出** 做的「免费工具站」起步项目：4 个纯浏览器端图片工具（压缩 / HEIC→JPG / PNG→JPG / 图片转 WebP），主打**隐私(不上传)+ 免费 + 无水印**，靠 Google 长尾搜索流量 + 展示广告(AdSense/Ezoic)变现。

> 这是「一人公司」打法的第一个案例。核心思路：工具页比 AI 文章更抗 Google 算法处罚、被 AI Overviews 引用、收录快；做成一个工具集群互相内链，整站权重滚雪球。

## 技术栈

- Next.js (App Router) + TypeScript + TailwindCSS
- `output: 'export'` 纯静态导出（产物在 `out/`，零服务器成本）
- 所有图片处理在浏览器完成：Canvas API + `browser-image-compression`(压缩) + `heic2any`(HEIC 解码)

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
```

构建静态产物：

```bash
npm run build      # 产物在 out/
npm run serve:out  # 本地预览静态产物 http://localhost:4321
```

一键验证（无头浏览器自动检查路由/结构化数据/工具功能）：

```bash
node scripts/verify.mjs
```

## 配置

复制环境变量模板并填写：

```bash
Copy-Item .env.example .env   # PowerShell
# 或  cp .env.example .env
```

最重要的一项：上线前把 `NEXT_PUBLIC_SITE_URL` 改成你的真实域名（影响 canonical / sitemap / OG）。
`ADSENSE`/`GA4`/`PLAUSIBLE` 留空时不会加载任何外部脚本，广告位显示占位框。

## 部署

### 方案 A：Cloudflare Pages（推荐，免费 + 全球 CDN + 自动 HTTPS）

手动一次性部署（需要先 `npm i -g wrangler` 并 `wrangler login`）：

```bash
npm run build
wrangler pages deploy out --project-name=pixelmint
```

自动 CI/CD：仓库已含 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。
在 GitHub 仓库 Secrets 配置 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`（及可选的 `NEXT_PUBLIC_*`），推送到 `main` 即自动部署。
也可以在 Cloudflare Pages 控制台直接「连接 Git 仓库」，设置 **Build command = `npm run build`**，**Output directory = `out`**。

### 方案 B：自有服务器（Docker + Nginx）

```bash
docker compose up -d --build      # 站点配置从 .env 读取并注入构建
# 访问 http://<服务器IP>:8080,生产环境建议前面再挂 Caddy/Nginx 负责 HTTPS
```

## 你需要自己完成的事（账号 / 秘钥，我无法代办）

1. **域名**：解析到 Cloudflare Pages 或你的服务器。
2. **Cloudflare 账号** + Pages 项目 + API Token（方案 A）。
3. **Google Search Console**：验证域名所有权，提交 `https://你的域名/sitemap.xml`。
4. **Bing Webmaster Tools**：同样验证并提交 sitemap。
5. **Google AdSense / Ezoic**：站点有内容和流量后申请；通过后把 Publisher ID 填进 `.env` 的 `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` 并在 AdSense 后台创建广告单元，把 slot 传给 `<AdSlot slot="..."/>`。
6. **分析**：注册 GA4 或 Plausible，把 ID 填进 `.env`。
7. **冷启动外链**：在 Reddit 相关板块、Product Hunt、Indie Hackers 真实分享工具（带来首批流量和外链，加速收录）。

## 变现接入（拿到 AdSense ID 后）

- 把 `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` 填好，重新构建，`<AdSlot>` 会自动从占位框切换成真实广告。
- 在 AdSense 后台为每个广告位创建「广告单元」，把得到的 slot ID 传给对应的 `<AdSlot slot="xxxx" />`（首页与每个工具页正文中各预留了一个广告位）。

## 如何新增一个工具（扩展整站）

只改一个文件 + 加一个路由：

1. 在 [lib/tools.ts](lib/tools.ts) 的 `TOOLS` 数组里加一个工具定义（slug / 文案 / FAQ / `config`）。
2. 新建 `app/<slug>/page.tsx`，照抄现有工具页 4 行模板即可（导航、sitemap、内链、JSON-LD 会自动包含它）。
3. `node scripts/verify.mjs` 验证，提交，CI 自动部署。

> 增长节奏建议：每周上 1–2 个相关长尾工具，并保证它们互相内链。这是工具站权重滚雪球的关键。

## 目录结构

```
app/                # 路由与页面(工具页/信任页/sitemap/robots)
components/         # Header/Footer/广告位/工具客户端组件/JSON-LD
lib/                # site 配置 / 工具注册表 / SEO 与结构化数据
docker/            # nginx 配置
scripts/verify.mjs # 无头浏览器自动验证
```
