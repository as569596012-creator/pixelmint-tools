import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, AUTHOR_NAME, AUTHOR_PROFILE_URL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `About ${SITE_NAME}`,
  description: `Learn who builds ${SITE_NAME} and why these free, private, in-browser image tools exist.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <article className="prose-tool mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">About {SITE_NAME}</h1>
      <p className="mt-4">
        {SITE_NAME} is a small collection of free image utilities — an image compressor and a few
        format converters — that run entirely inside your web browser. Nothing you open is ever
        uploaded to a server.
      </p>
      <h2 className="mt-8 text-xl font-bold text-gray-900">Why we built it</h2>
      <p className="mt-3">
        Most "free" online image tools quietly upload your personal photos to their servers, add
        watermarks, or push you toward a paid plan. We wanted the opposite: tools that are
        genuinely free, respect your privacy by processing files locally, and just work without an
        account. Because the work happens on your device using the Canvas API and WebAssembly,
        results are usually faster too.
      </p>
      <h2 className="mt-8 text-xl font-bold text-gray-900">Who runs this site</h2>
      <p className="mt-3">
        {SITE_NAME} is built and maintained by {AUTHOR_NAME}. We test each tool with real photos
        before publishing it and keep the tools updated as browser capabilities improve.
        {AUTHOR_PROFILE_URL ? (
          <>
            {" "}
            You can find more about the author{" "}
            <a className="text-mint-700 underline" href={AUTHOR_PROFILE_URL} rel="noopener noreferrer">
              here
            </a>
            .
          </>
        ) : null}
      </p>
      <h2 className="mt-8 text-xl font-bold text-gray-900">How we make money</h2>
      <p className="mt-3">
        The tools are free to use. To cover hosting and development time, some pages display ads
        and may include affiliate links to products we think are useful. This never changes how the
        tools work or what they cost you.
      </p>
    </article>
  );
}
