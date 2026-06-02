// 工具注册表:首页列表、每个工具页、sitemap、内链都从这里读取,新增工具只改这一处。

export type ToolMode = "compress" | "convert";

export interface FaqItem {
  q: string;
  a: string;
}

export interface ToolDef {
  slug: string; // 路由 /<slug>/
  name: string; // 导航/卡片显示名
  emoji: string;
  // SEO
  title: string; // <title>
  metaDescription: string;
  h1: string;
  intro: string; // H1 下方一句话
  keywords: string[];
  // 页面正文(真实使用说明 + FAQ,满足 E-E-A-T 与 AdSense 审核)
  howTo: string[];
  body: string; // 一段 120-300 字的真实说明
  faq: FaqItem[];
  // 客户端工具行为
  config: {
    mode: ToolMode;
    accept: string; // input accept 属性
    acceptHeic: boolean; // 是否需要 heic2any 解码
    outputMime?: "image/jpeg" | "image/png" | "image/webp"; // convert 模式输出格式
    outputExt?: "jpg" | "png" | "webp";
    showQuality: boolean; // 是否显示质量滑块
    defaultQuality: number; // 0-100
    showTargetSize: boolean; // 是否显示"目标 KB"(仅压缩)
  };
}

export const TOOLS: ToolDef[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    emoji: "🗜️",
    title: "Image Compressor — Compress JPG, PNG & WebP Online (Free, No Upload)",
    metaDescription:
      "Free online image compressor. Reduce JPG, PNG and WebP file size in your browser — no upload, no sign-up, no watermark. Compress images to 100KB, 200KB and more.",
    h1: "Image Compressor",
    intro: "Shrink JPG, PNG and WebP images right in your browser. Nothing is uploaded.",
    keywords: [
      "image compressor",
      "compress image online",
      "compress image to 100kb online",
      "reduce image size",
      "compress jpeg",
    ],
    howTo: [
      "Drop or select one or more images (JPG, PNG, WebP).",
      "Drag the quality slider to balance size and clarity.",
      "Click Compress, then download each result or all at once.",
    ],
    body: "This image compressor runs entirely in your browser using the Canvas API and a WebAssembly-based compressor, so your photos never leave your device. That makes it both faster (no upload/download round-trip) and more private than server-based tools. It works well for getting photos under common limits like 100KB or 200KB for forms, job portals and websites, and for cutting page weight to improve Core Web Vitals. For the smallest files at good quality, try exporting to WebP after compressing.",
    faq: [
      {
        q: "Are my images uploaded to a server?",
        a: "No. All compression happens locally in your browser. You can open your browser's Network tab and confirm there are no outbound image requests.",
      },
      {
        q: "How do I compress an image to 100KB?",
        a: "Lower the quality slider and re-compress until the result size shown is under 100KB. Larger photos may also need to be resized down first.",
      },
      {
        q: "Does compressing reduce quality?",
        a: "Lossy compression trades some detail for smaller size. At quality 70–80 the difference is usually invisible on screens while the file gets much smaller.",
      },
    ],
    config: {
      mode: "compress",
      accept: "image/jpeg,image/png,image/webp",
      acceptHeic: false,
      showQuality: true,
      defaultQuality: 75,
      showTargetSize: true,
    },
  },
  {
    slug: "heic-to-jpg",
    name: "HEIC to JPG",
    emoji: "📷",
    title: "HEIC to JPG Converter — Free, Online, No Upload",
    metaDescription:
      "Convert HEIC to JPG free, online and in your browser. Turn iPhone HEIC photos into universally compatible JPG images with no upload, no sign-up and no watermark.",
    h1: "HEIC to JPG Converter",
    intro: "Convert iPhone HEIC photos to JPG instantly, privately, in your browser.",
    keywords: [
      "heic to jpg",
      "convert heic to jpg free",
      "heic to jpg converter",
      "heic to jpeg online",
      "iphone photo to jpg",
    ],
    howTo: [
      "Select the .heic / .heif photos from your iPhone or Mac.",
      "Pick an output quality (90 keeps photos crisp).",
      "Click Convert and download your JPG files.",
    ],
    body: "Apple saves photos as HEIC to save space, but many websites, Windows apps and older tools still expect JPG. This converter decodes HEIC locally with a WebAssembly decoder and re-encodes to JPG using the Canvas API — your photos are never uploaded, which matters for personal images. You can convert several files at once, then download them individually or all together. If you also need smaller files for the web, run the results through the Image Compressor or convert to WebP.",
    faq: [
      {
        q: "Why won't my iPhone photos open on Windows?",
        a: "iPhones save photos in HEIC, which older Windows versions and many web forms don't support. Converting to JPG fixes compatibility everywhere.",
      },
      {
        q: "Is this HEIC to JPG converter really free?",
        a: "Yes. There is no sign-up, no watermark and no file-count limit, and the conversion runs entirely in your browser.",
      },
      {
        q: "Will converting HEIC to JPG lower quality?",
        a: "JPG is lossy, but at quality 90+ the visual difference is negligible while gaining universal compatibility.",
      },
    ],
    config: {
      mode: "convert",
      accept: ".heic,.heif,image/heic,image/heif",
      acceptHeic: true,
      outputMime: "image/jpeg",
      outputExt: "jpg",
      showQuality: true,
      defaultQuality: 90,
      showTargetSize: false,
    },
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    emoji: "🖼️",
    title: "PNG to JPG Converter — Free Online, No Upload",
    metaDescription:
      "Convert PNG to JPG free and online. Flatten transparency and shrink file size in your browser — no upload, no sign-up, no watermark.",
    h1: "PNG to JPG Converter",
    intro: "Turn PNG images into smaller, universally supported JPG files in your browser.",
    keywords: [
      "png to jpg",
      "png to jpg converter",
      "convert png to jpg",
      "png to jpeg online",
    ],
    howTo: [
      "Add one or more PNG images.",
      "Choose the JPG quality you want.",
      "Convert and download — transparency becomes a white background.",
    ],
    body: "PNG is great for graphics and transparency, but JPG is usually far smaller for photos and is accepted everywhere. This tool draws each PNG onto a Canvas (placing transparent areas on a white background) and re-encodes it as JPG locally in your browser — no servers involved. It's handy for reducing upload size on forms and marketplaces, or for sharing screenshots that don't need transparency. For graphics with sharp edges or text you want to keep crisp and small, consider WebP instead.",
    faq: [
      {
        q: "What happens to transparent areas?",
        a: "JPG doesn't support transparency, so transparent pixels are placed on a white background during conversion.",
      },
      {
        q: "Is PNG or JPG smaller?",
        a: "For photographs JPG is normally much smaller. For flat graphics, logos and screenshots PNG or WebP can be smaller.",
      },
    ],
    config: {
      mode: "convert",
      accept: "image/png",
      acceptHeic: false,
      outputMime: "image/jpeg",
      outputExt: "jpg",
      showQuality: true,
      defaultQuality: 85,
      showTargetSize: false,
    },
  },
  {
    slug: "image-to-webp",
    name: "Image to WebP",
    emoji: "⚡",
    title: "Image to WebP Converter — JPG & PNG to WebP, Free & Online",
    metaDescription:
      "Convert JPG and PNG images to WebP free and online, in your browser. Smaller files for faster websites — no upload, no sign-up, no watermark.",
    h1: "Image to WebP Converter",
    intro: "Convert JPG and PNG to modern WebP for smaller files and faster pages.",
    keywords: [
      "image to webp",
      "convert to webp",
      "jpg to webp",
      "png to webp",
      "webp converter online",
    ],
    howTo: [
      "Add JPG or PNG images.",
      "Set the WebP quality (80 is a great default).",
      "Convert and download the smaller WebP files.",
    ],
    body: "WebP typically produces 25–35% smaller files than JPG at the same visual quality, which is why it's a go-to format for web performance and better Core Web Vitals. This converter re-encodes your images to WebP using the browser's native Canvas encoder, entirely on your device — nothing is uploaded. Use it to optimize images before publishing to a website, CMS or app. If a destination doesn't accept WebP yet, convert to JPG instead with our PNG to JPG / compressor tools.",
    faq: [
      {
        q: "Is WebP better than JPG?",
        a: "For the web, usually yes — WebP is smaller at the same quality. Just confirm your destination platform accepts WebP uploads.",
      },
      {
        q: "Does every browser support WebP?",
        a: "All modern browsers display WebP. Very old software may not, in which case use JPG.",
      },
    ],
    config: {
      mode: "convert",
      accept: "image/jpeg,image/png",
      acceptHeic: false,
      outputMime: "image/webp",
      outputExt: "webp",
      showQuality: true,
      defaultQuality: 80,
      showTargetSize: false,
    },
  },
];

export function getTool(slug: string): ToolDef | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

// 内链:返回除自己以外的其它工具,用于"相关工具"区块
export function relatedTools(slug: string): ToolDef[] {
  return TOOLS.filter((t) => t.slug !== slug);
}
