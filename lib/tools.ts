// 工具注册表:首页列表、每个工具页、sitemap、内链都从这里读取,新增工具只改这一处。

export type ToolMode = "compress" | "convert" | "resize";

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
    // resize 模式专属
    defaultWidthPx?: number; // 默认宽度(像素)
    maintainAspectRatio?: boolean; // 是否默认锁定宽高比
  };
}

// 按使用频率从高到低排列:
// 1 image-compressor  — 最高搜索量
// 2 heic-to-jpg       — iPhone 用户基数大
// 3 image-resizer     — 压缩前先缩尺寸，强相关需求
// 4 png-to-jpg        — 极常见
// 5 image-to-webp     — 网页开发者
// 6 jpg-to-png        — 中等
// 7 webp-to-jpg       — 中等
// 8 gif-to-jpg        — 中等
// 9 bmp-to-jpg        — 较小众
export const TOOLS: ToolDef[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    emoji: "🗜️",
    title: "Compress Image Online Free — No Upload, No Sign-up | PicCrush",
    metaDescription:
      "Compress JPG, PNG and WebP images to 100KB, 50KB or any size — free, instant, and 100% in your browser. No upload, no sign-up, no watermark.",
    h1: "Compress Image Online Free — No Upload",
    intro: "Reduce JPG, PNG and WebP file size in seconds. Everything runs in your browser — your photos never leave your device.",
    keywords: [
      "compress image online free",
      "compress image to 100kb",
      "compress image to 50kb",
      "compress image to 200kb",
      "reduce image size without losing quality",
      "compress jpeg online",
      "image compressor no upload",
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
        a: "Drop your image, lower the quality slider gradually, and watch the output size. Most photos reach 100KB at quality 40–60. For very large images, reduce dimensions first.",
      },
      {
        q: "How do I compress an image to 50KB?",
        a: "Set quality to around 30–45 and compress. If the file is still over 50KB, try resizing the image to smaller dimensions before compressing.",
      },
      {
        q: "How do I compress an image without losing quality?",
        a: "Use quality 75–85 for a good balance. At these settings the visual difference is barely noticeable while file size drops by 40–60%.",
      },
      {
        q: "Does compressing reduce quality?",
        a: "Lossy compression trades some detail for smaller size. At quality 70–80 the difference is usually invisible on screens while the file gets much smaller.",
      },
      {
        q: "What image formats are supported?",
        a: "JPG, PNG and WebP. For HEIC (iPhone photos), use our HEIC to JPG converter first.",
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
    title: "HEIC to JPG Converter — Free Online, No Upload, No Sign-up",
    metaDescription:
      "Convert iPhone HEIC photos to JPG free and instantly in your browser. No upload, no sign-up, no watermark. Works on Windows, Mac and Android.",
    h1: "Convert HEIC to JPG Free — No Upload",
    intro: "Turn iPhone HEIC photos into universally compatible JPG files in seconds. Runs entirely in your browser — nothing is uploaded.",
    keywords: [
      "heic to jpg",
      "convert heic to jpg free",
      "heic to jpg converter online",
      "heic to jpg no upload",
      "iphone heic to jpg",
      "heic to jpg windows",
      "heic to jpeg free",
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
        q: "How do I convert HEIC to JPG on Windows without installing software?",
        a: "Use PicCrush's HEIC to JPG converter — it runs in any browser on Windows, Mac or Android. No download or installation needed.",
      },
      {
        q: "Is this HEIC to JPG converter really free?",
        a: "Yes. There is no sign-up, no watermark and no file-count limit, and the conversion runs entirely in your browser.",
      },
      {
        q: "Will converting HEIC to JPG lower quality?",
        a: "JPG is lossy, but at quality 90+ the visual difference is negligible while gaining universal compatibility.",
      },
      {
        q: "Can I convert multiple HEIC files at once?",
        a: "Yes. Select multiple .heic files at once and download them all as a ZIP, or one by one.",
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
    slug: "image-resizer",
    name: "Image Resizer",
    emoji: "📐",
    title: "Resize Image Online Free — No Upload, Pixel-Perfect Output | PicCrush",
    metaDescription:
      "Resize JPG, PNG and WebP images to any width or height free in your browser. Lock aspect ratio, no upload, no sign-up, no watermark.",
    h1: "Resize Image Online Free — No Upload",
    intro: "Scale images to any width or height instantly. Lock the aspect ratio to avoid stretching — everything runs in your browser.",
    keywords: [
      "resize image online free",
      "resize image to specific size",
      "image resizer no upload",
      "resize photo online free",
      "resize jpg online",
      "resize png online free",
      "reduce image dimensions",
    ],
    howTo: [
      "Drop or select one or more images (JPG, PNG, WebP).",
      "Enter the target width in pixels — height updates automatically if aspect ratio is locked.",
      "Unlock the ratio to set a custom height, then click Resize and download.",
    ],
    body: "Resizing an image before compressing it is the most effective way to shrink file size — halving the dimensions reduces the pixel count (and file size) by up to 75%. This resizer scales images using the browser's Canvas API, so nothing leaves your device. You can resize by width, height, or both. The lock-aspect-ratio option prevents unwanted stretching. Output is saved as JPG for photos and PNG for PNG inputs. Pair it with the Image Compressor to hit a specific file-size target.",
    faq: [
      {
        q: "How do I resize an image without distorting it?",
        a: "Enable the 'Lock aspect ratio' toggle. Enter only the width — the height is calculated automatically to keep the original proportions.",
      },
      {
        q: "What is the best way to reduce image file size?",
        a: "First resize the image to the dimensions you actually need, then compress it. Reducing a 4000 px photo to 1200 px before compressing gives far smaller files than compression alone.",
      },
      {
        q: "Does resizing reduce image quality?",
        a: "Downscaling (making the image smaller) looks excellent because the browser averages nearby pixels. Upscaling (making it larger) will look blurry because no new detail is added.",
      },
      {
        q: "What output format will I get?",
        a: "PNG inputs are saved as PNG; all other formats (JPG, WebP, GIF, BMP) are saved as JPG at quality 90.",
      },
      {
        q: "Can I resize multiple images at once?",
        a: "Yes — drop several files and they will all be resized to the same target dimensions. Download them individually or all at once.",
      },
    ],
    config: {
      mode: "resize",
      accept: "image/jpeg,image/png,image/webp,image/gif,image/bmp",
      acceptHeic: false,
      showQuality: false,
      defaultQuality: 90,
      showTargetSize: false,
      defaultWidthPx: 1280,
      maintainAspectRatio: true,
    },
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    emoji: "🖼️",
    title: "PNG to JPG Converter — Free Online, No Upload, No Quality Loss",
    metaDescription:
      "Convert PNG to JPG free in your browser — no upload, no sign-up, no watermark. Adjust quality to keep sharpness while reducing file size.",
    h1: "Convert PNG to JPG Free — No Upload",
    intro: "Turn PNG images into smaller JPG files instantly. Runs in your browser — no upload, no sign-up.",
    keywords: [
      "png to jpg",
      "png to jpg converter",
      "convert png to jpg free",
      "png to jpg without losing quality",
      "png to jpeg online free",
      "png to jpg no upload",
    ],
    howTo: [
      "Add one or more PNG images.",
      "Choose the JPG quality you want.",
      "Convert and download — transparency becomes a white background.",
    ],
    body: "PNG is great for graphics and transparency, but JPG is usually far smaller for photos and is accepted everywhere. This tool draws each PNG onto a Canvas (placing transparent areas on a white background) and re-encodes it as JPG locally in your browser — no servers involved. It's handy for reducing upload size on forms and marketplaces, or for sharing screenshots that don't need transparency. For graphics with sharp edges or text you want to keep crisp and small, consider WebP instead.",
    faq: [
      {
        q: "How do I convert PNG to JPG without losing quality?",
        a: "Set the quality slider to 85–95. At these settings the output looks identical to the original on screen while the file size drops significantly.",
      },
      {
        q: "What happens to transparent areas?",
        a: "JPG doesn't support transparency, so transparent pixels are placed on a white background during conversion.",
      },
      {
        q: "Is PNG or JPG smaller?",
        a: "For photographs JPG is normally much smaller. For flat graphics, logos and screenshots PNG or WebP can be smaller.",
      },
      {
        q: "Can I convert PNG to JPG without software?",
        a: "Yes — PicCrush converts PNG to JPG entirely in your browser. No software download or installation is needed.",
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
    title: "Convert Image to WebP Free — JPG & PNG to WebP Online, No Upload",
    metaDescription:
      "Convert JPG and PNG to WebP free in your browser. Get 25–35% smaller files for faster websites — no upload, no sign-up, no watermark.",
    h1: "Convert Image to WebP Free — No Upload",
    intro: "Convert JPG and PNG to WebP for smaller files and faster websites. Runs entirely in your browser.",
    keywords: [
      "image to webp",
      "convert image to webp free",
      "jpg to webp converter",
      "png to webp online free",
      "webp converter no upload",
      "convert to webp online",
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
        a: "For the web, usually yes — WebP produces files 25–35% smaller than JPG at the same visual quality. Just confirm your destination platform accepts WebP uploads.",
      },
      {
        q: "How do I convert JPG to WebP for free?",
        a: "Drop your JPG into PicCrush's converter, set quality to 80, and click Convert. The whole process runs in your browser with no upload.",
      },
      {
        q: "Does every browser support WebP?",
        a: "All modern browsers (Chrome, Firefox, Safari, Edge) display WebP. Very old software may not, in which case use JPG.",
      },
      {
        q: "Will converting to WebP improve my website speed?",
        a: "Yes. Smaller WebP files load faster and improve Google Core Web Vitals (LCP), which can positively impact your search ranking.",
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
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    emoji: "🔄",
    title: "JPG to PNG Converter — Free Online, No Upload, Lossless Output",
    metaDescription:
      "Convert JPG to PNG free in your browser — no upload, no sign-up, no watermark. Get lossless PNG output with full transparency support.",
    h1: "Convert JPG to PNG Free — No Upload",
    intro: "Turn JPG images into lossless PNG files instantly. Runs in your browser — nothing is uploaded to any server.",
    keywords: [
      "jpg to png",
      "convert jpg to png free",
      "jpg to png online",
      "jpg to png converter",
      "jpeg to png free",
      "jpg to png no upload",
      "convert jpeg to png online",
    ],
    howTo: [
      "Select one or more JPG or WebP images.",
      "Adjust quality if needed (PNG output is lossless; quality affects intermediate decoding).",
      "Click Convert and download your PNG files.",
    ],
    body: "PNG is a lossless format ideal for screenshots, graphics, logos and images that need a transparent background. This tool re-encodes your JPG or WebP images to PNG entirely in your browser using the Canvas API — no files leave your device. The output PNG retains the full resolution and color of the original. Because PNG is lossless it is usually larger than JPG; if you need a smaller file for the web, consider using our Image to WebP converter instead.",
    faq: [
      {
        q: "Why convert JPG to PNG?",
        a: "PNG supports transparency and is lossless, making it better for graphics, logos, and images you plan to edit further. JPG uses lossy compression that degrades quality on each re-save.",
      },
      {
        q: "Will my JPG image have a transparent background after converting to PNG?",
        a: "No — JPG doesn't store transparency data, so the converted PNG will have the same opaque background as the original JPG.",
      },
      {
        q: "Is PNG or JPG better for photos?",
        a: "JPG is usually better for photos because it produces much smaller files. Use PNG for screenshots, graphics, logos, or images with sharp edges and flat colors.",
      },
      {
        q: "Can I convert JPG to PNG without losing quality?",
        a: "Yes — PNG is lossless, so the conversion preserves all detail from the original JPG. No further quality is lost in the PNG encoding step.",
      },
    ],
    config: {
      mode: "convert",
      accept: "image/jpeg,image/webp",
      acceptHeic: false,
      outputMime: "image/png",
      outputExt: "png",
      showQuality: false,
      defaultQuality: 100,
      showTargetSize: false,
    },
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    emoji: "↩️",
    title: "WebP to JPG Converter — Free Online, No Upload, No Sign-up",
    metaDescription:
      "Convert WebP images to JPG free in your browser — no upload, no sign-up, no watermark. Works instantly on any device.",
    h1: "Convert WebP to JPG Free — No Upload",
    intro: "Convert WebP images back to universally compatible JPG files instantly. Runs entirely in your browser — nothing is uploaded.",
    keywords: [
      "webp to jpg",
      "convert webp to jpg free",
      "webp to jpg online",
      "webp to jpeg converter",
      "webp to jpg no upload",
      "webp to jpg converter online free",
    ],
    howTo: [
      "Select one or more WebP images.",
      "Set the JPG output quality (85 gives a great balance of size and sharpness).",
      "Click Convert and download your JPG files.",
    ],
    body: "WebP is a modern web format but not every app, platform or printer accepts it yet. This converter re-encodes WebP images to universally compatible JPG entirely in your browser using the Canvas API — your files are never uploaded. Transparent areas in WebP images are composited on a white background since JPG does not support transparency. If you need to share photos with someone who can't open WebP, or upload to a platform that requires JPG, this tool is the fastest solution.",
    faq: [
      {
        q: "Why do I need to convert WebP to JPG?",
        a: "Some older apps, email clients, social platforms, and print services don't accept WebP. Converting to JPG ensures universal compatibility.",
      },
      {
        q: "Will converting WebP to JPG reduce quality?",
        a: "JPG is a lossy format. At quality 85–95 the visual difference is minimal, but you will lose the small file-size advantage that WebP offers.",
      },
      {
        q: "What happens to transparent areas in a WebP file?",
        a: "JPG does not support transparency, so any transparent pixels are filled with a white background during conversion.",
      },
      {
        q: "How do I convert WebP to JPG on iPhone or Android?",
        a: "Open this page in your mobile browser, pick your WebP file, and download the JPG. No app install needed.",
      },
    ],
    config: {
      mode: "convert",
      accept: "image/webp",
      acceptHeic: false,
      outputMime: "image/jpeg",
      outputExt: "jpg",
      showQuality: true,
      defaultQuality: 85,
      showTargetSize: false,
    },
  },
  {
    slug: "gif-to-jpg",
    name: "GIF to JPG",
    emoji: "🎞️",
    title: "GIF to JPG Converter — Free Online, No Upload, No Sign-up",
    metaDescription:
      "Convert GIF images to JPG free in your browser — no upload, no sign-up. Reduces file size dramatically. Works on static and animated GIFs.",
    h1: "Convert GIF to JPG Free — No Upload",
    intro: "Convert GIF images to compact JPG files in seconds. Runs entirely in your browser — your files are never uploaded.",
    keywords: [
      "gif to jpg",
      "convert gif to jpg free",
      "gif to jpg online",
      "gif to jpeg converter",
      "gif to jpg no upload",
      "convert gif to jpeg free online",
    ],
    howTo: [
      "Select one or more GIF images.",
      "Set the JPG quality (80 is a great default for photos).",
      "Click Convert and download your JPG files.",
    ],
    body: "GIF files can be surprisingly large, especially when they contain photographic content. Converting a static GIF to JPG typically reduces the file size by 50–80% while preserving full visual quality. This tool converts GIFs to JPG entirely in your browser using the Canvas API — nothing is uploaded. For animated GIFs only the first frame is captured. The result is a standard JPG accepted everywhere — great for forms, email attachments, and web uploads that reject GIF.",
    faq: [
      {
        q: "Can I convert an animated GIF to JPG?",
        a: "Yes, but only the first frame of the animation is saved as the JPG. If you need all frames, you would need a dedicated GIF splitter tool first.",
      },
      {
        q: "Why is my GIF so much larger than the JPG?",
        a: "GIF uses lossless LZW compression limited to 256 colors, which makes it inefficient for photos. JPG is optimized for photographic content and compresses much more effectively.",
      },
      {
        q: "What happens to transparent areas in a GIF?",
        a: "GIF supports 1-bit transparency. Transparent pixels will be filled with a white background in the JPG output.",
      },
      {
        q: "How do I reduce the size of a GIF?",
        a: "The fastest way is to convert it to JPG (for photos) or WebP (for animation-friendly format). Both produce much smaller files than GIF.",
      },
    ],
    config: {
      mode: "convert",
      accept: "image/gif",
      acceptHeic: false,
      outputMime: "image/jpeg",
      outputExt: "jpg",
      showQuality: true,
      defaultQuality: 80,
      showTargetSize: false,
    },
  },
  {
    slug: "bmp-to-jpg",
    name: "BMP to JPG",
    emoji: "🖨️",
    title: "BMP to JPG Converter — Free Online, No Upload, No Sign-up",
    metaDescription:
      "Convert BMP images to JPG free in your browser — no upload, no sign-up. Shrink huge BMP files by up to 95% instantly.",
    h1: "Convert BMP to JPG Free — No Upload",
    intro: "Shrink oversized BMP files into compact JPG images instantly. Runs entirely in your browser — nothing is uploaded.",
    keywords: [
      "bmp to jpg",
      "convert bmp to jpg free",
      "bmp to jpg online",
      "bmp to jpeg converter",
      "bmp to jpg no upload",
      "convert bmp to jpeg free online",
    ],
    howTo: [
      "Select one or more BMP images.",
      "Set the JPG quality (85 keeps photos sharp while cutting size drastically).",
      "Click Convert and download your compact JPG files.",
    ],
    body: "BMP (Bitmap) is an uncompressed format originally from Windows Paint — a 10 MB BMP photo can shrink to under 500 KB as a JPG with no visible quality loss. This converter processes BMP files entirely in your browser using the Canvas API, so nothing is uploaded. It's ideal for scanned documents, screenshots from older Windows software, and files exported from CAD or medical imaging tools. The resulting JPG is universally compatible and ready for email, web upload or printing.",
    faq: [
      {
        q: "Why are BMP files so large?",
        a: "BMP stores every pixel as raw, uncompressed data. A 3000×2000 BMP takes about 17 MB; the equivalent JPG is typically under 1 MB.",
      },
      {
        q: "How much smaller will my file be after converting BMP to JPG?",
        a: "Typically 90–95% smaller. A 10 MB BMP often converts to a 300–600 KB JPG at quality 85 with no visible quality difference.",
      },
      {
        q: "Is BMP or JPG better for printing?",
        a: "For printing, both produce similar results, but JPG is far easier to share and upload. Use JPG at quality 90+ for print-quality output.",
      },
      {
        q: "Can I convert multiple BMP files at once?",
        a: "Yes — select multiple BMP files at once and download them all individually or use the 'Download all' button.",
      },
    ],
    config: {
      mode: "convert",
      accept: "image/bmp",
      acceptHeic: false,
      outputMime: "image/jpeg",
      outputExt: "jpg",
      showQuality: true,
      defaultQuality: 85,
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
