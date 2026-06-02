import type { Metadata } from "next";
import ToolPageView from "@/components/ToolPageView";
import { buildMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const SLUG = "image-compressor";
const tool = getTool(SLUG)!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.metaDescription,
  path: `/${SLUG}/`,
  keywords: tool.keywords,
});

export default function Page() {
  return <ToolPageView slug={SLUG} />;
}
