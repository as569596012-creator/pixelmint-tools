import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl, AUTHOR_NAME } from "@/lib/site";
import type { ToolDef } from "@/lib/tools";

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // 以 / 开头
  keywords?: string[];
}

export function buildMetadata({ title, description, path, keywords }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// 整站基础 JSON-LD:WebSite,放在根 layout
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

// 工具页:SoftwareApplication(GEO:让 AI Overviews 识别这是一个可用工具)
export function softwareAppJsonLd(tool: ToolDef) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (web browser)",
    url: absoluteUrl(`/${tool.slug}/`),
    description: tool.metaDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: AUTHOR_NAME,
    },
  };
}

export function faqJsonLd(tool: ToolDef) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// 内容文章页:Article(让搜索引擎/AI 识别为一篇教程文章,利于富结果与 E-E-A-T)
export function articleJsonLd(guide: {
  title: string;
  metaDescription: string;
  slug: string;
  date: string;
}) {
  const url = absoluteUrl(`/guides/${guide.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    url,
    mainEntityOfPage: url,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { "@type": "Organization", name: AUTHOR_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}
