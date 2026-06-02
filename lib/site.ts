// 站点级配置。构建时从环境变量读取(NEXT_PUBLIC_ 前缀才能在浏览器端可用),
// 没有配置时用下面的默认值,保证本地开发与首次构建都能跑通。

function env(key: string, fallback: string): string {
  const v = process.env[key];
  return v && v.trim().length > 0 ? v.trim() : fallback;
}

// 站点对外的正式域名(用于生成 canonical / sitemap / OG 绝对地址)。
// 上线前在 .env 里把 NEXT_PUBLIC_SITE_URL 设成你的真实域名,例如 https://pixelmint.app
export const SITE_URL = env("NEXT_PUBLIC_SITE_URL", "https://example.com").replace(/\/$/, "");

export const SITE_NAME = env("NEXT_PUBLIC_SITE_NAME", "PixelMint");

export const SITE_TAGLINE = env(
  "NEXT_PUBLIC_SITE_TAGLINE",
  "Free in-browser image tools — compress and convert without uploading.",
);

export const SITE_DESCRIPTION = env(
  "NEXT_PUBLIC_SITE_DESCRIPTION",
  "Free online image tools that run 100% in your browser. Compress images, convert HEIC to JPG, PNG to JPG, and images to WebP. No uploads, no sign-up, no watermark.",
);

// E-E-A-T:真实作者署名,审广告与排名都看重
export const AUTHOR_NAME = env("NEXT_PUBLIC_AUTHOR_NAME", "The PixelMint Team");
export const AUTHOR_PROFILE_URL = env("NEXT_PUBLIC_AUTHOR_PROFILE_URL", "");

export const CONTACT_EMAIL = env("NEXT_PUBLIC_CONTACT_EMAIL", "hello@example.com");

// 变现 / 分析(留空则不会注入对应脚本)
export const ADSENSE_PUBLISHER_ID = env("NEXT_PUBLIC_ADSENSE_PUBLISHER_ID", ""); // ca-pub-xxxxxxxx
export const GA4_ID = env("NEXT_PUBLIC_GA4_ID", ""); // G-XXXXXXX
export const PLAUSIBLE_DOMAIN = env("NEXT_PUBLIC_PLAUSIBLE_DOMAIN", "");

export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
