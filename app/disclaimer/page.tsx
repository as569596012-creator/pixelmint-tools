import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Disclaimer`,
  description: `Terms of use and disclaimer for ${SITE_NAME} image tools.`,
  path: "/disclaimer/",
});

export default function DisclaimerPage() {
  return (
    <article className="prose-tool mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Disclaimer</h1>
      <p className="mt-4">
        The tools on {SITE_NAME} are provided "as is", free of charge, for general use. While we
        test each tool carefully, we make no warranties about the accuracy, reliability, or
        suitability of the output for any particular purpose.
      </p>
      <h2 className="mt-8 text-xl font-bold text-gray-900">Keep your originals</h2>
      <p className="mt-3">
        Image conversion and compression can change file size and quality. Always keep a copy of
        your original files. We are not liable for any loss of data or quality resulting from use
        of these tools.
      </p>
      <h2 className="mt-8 text-xl font-bold text-gray-900">External links</h2>
      <p className="mt-3">
        Some pages may contain ads or affiliate links to third-party websites. We are not
        responsible for the content or practices of those sites.
      </p>
      <h2 className="mt-8 text-xl font-bold text-gray-900">Use responsibly</h2>
      <p className="mt-3">
        You are responsible for ensuring you have the right to process any images you use with
        these tools.
      </p>
    </article>
  );
}
