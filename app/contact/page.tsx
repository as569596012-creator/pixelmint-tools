import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `Contact ${SITE_NAME}`,
  description: `Get in touch with the ${SITE_NAME} team for feedback, bug reports, or partnership questions.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <article className="prose-tool mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Contact us</h1>
      <p className="mt-4">
        We'd love to hear from you — whether you found a bug, want a new tool, or have a
        partnership idea.
      </p>
      <p className="mt-4">
        Email:{" "}
        <a className="font-semibold text-mint-700 underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-4 text-sm text-gray-500">
        We usually reply within a couple of business days. Because tools run in your browser, we
        never receive your images and cannot recover files for you.
      </p>
    </article>
  );
}
