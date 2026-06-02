import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, CONTACT_EMAIL, ADSENSE_PUBLISHER_ID, GA4_ID } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Privacy Policy`,
  description: `How ${SITE_NAME} handles your data. Images are processed locally and never uploaded.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <article className="prose-tool mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Your images stay on your device</h2>
      <p className="mt-3">
        Every tool on {SITE_NAME} processes your files entirely within your web browser using the
        Canvas API and WebAssembly. Your images are never uploaded to, stored on, or transmitted to
        our servers. You can verify this by opening your browser's developer tools and watching the
        Network tab while you use a tool.
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Information we collect</h2>
      <p className="mt-3">
        We do not require accounts and we do not collect your images. We may collect anonymous,
        aggregated usage statistics (such as page views and which tools are popular) to improve the
        site.
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Cookies and third parties</h2>
      <p className="mt-3">
        {ADSENSE_PUBLISHER_ID
          ? "We use Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising by visiting Google Ads Settings."
          : "We may display ads in the future; if we do, third-party vendors such as Google may use cookies to serve ads based on your visits to this and other sites."}
        {GA4_ID
          ? " We also use a privacy-conscious analytics tool to understand aggregate traffic."
          : ""}
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Your choices</h2>
      <p className="mt-3">
        You can disable cookies in your browser settings and use browser-level controls to limit
        ad personalization. Because we don't store your files or personal data, there is nothing
        for us to delete on your behalf.
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Contact</h2>
      <p className="mt-3">
        Questions about this policy? Email{" "}
        <a className="font-semibold text-mint-700 underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </article>
  );
}
