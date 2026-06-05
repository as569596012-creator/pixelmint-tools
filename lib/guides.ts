// 内容文章注册表（/guides/）。每篇文章 = 这里一条元数据 + 一个 app/guides/<slug>/page.tsx 正文。
// 文章吃"信息型/操作型"长尾词（how to / why），正文自然内链到对应工具，把读者导流到工具页。
// 新增文章：在 GUIDES 加一条 + 复制一个 page.tsx 写正文即可（sitemap/列表页/导航会自动带上）。

import { getTool, type ToolDef } from "@/lib/tools";

export interface GuideDef {
  slug: string; // 路由 /guides/<slug>/
  title: string; // <title>（不含站名，站名由 layout 模板自动加）
  metaDescription: string;
  h1: string;
  intro: string; // H1 下方一句话
  description: string; // 列表页摘要
  date: string; // ISO 日期，用于 Article 结构化数据 + 页面显示
  keywords: string[];
  relatedSlugs: string[]; // 关联工具 slug，用于底部"去用这个工具"CTA 内链
}

export const GUIDES: GuideDef[] = [
  {
    slug: "compress-images-for-email",
    title: "How to Compress Images for Email (Free, No Upload)",
    metaDescription:
      "Email attachments bouncing back as too large? Learn how to compress images for Gmail, Outlook and Apple Mail in seconds — free, in your browser, no upload required.",
    h1: "How to Compress Images for Email",
    intro:
      "Most email providers cap attachments at 20–25 MB. Here is the fastest way to shrink your photos so they actually send — without uploading them anywhere.",
    description:
      "A step-by-step guide to shrinking photos so they fit Gmail, Outlook and Apple Mail attachment limits, with the exact quality settings to use.",
    date: "2026-06-05",
    keywords: [
      "how to compress images for email",
      "compress photos for email",
      "reduce image size for email",
      "email attachment too large",
      "compress jpeg for gmail",
    ],
    relatedSlugs: ["image-compressor", "image-resizer"],
  },
];

export function getGuide(slug: string): GuideDef | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function relatedToolsForGuide(guide: GuideDef): ToolDef[] {
  return guide.relatedSlugs
    .map((slug) => getTool(slug))
    .filter((t): t is ToolDef => Boolean(t));
}
