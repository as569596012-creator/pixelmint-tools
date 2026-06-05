import Link from "next/link";
import { SITE_NAME, AUTHOR_NAME } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="text-base font-bold text-gray-900">{SITE_NAME}</div>
          <p className="mt-2 text-sm text-gray-500">
            Free image tools that run entirely in your browser. No uploads, no sign-up.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Tools</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {TOOLS.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}/`} className="hover:text-mint-700">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/guides/" className="hover:text-mint-700">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/about/" className="hover:text-mint-700">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-mint-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Legal</div>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/privacy/" className="hover:text-mint-700">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/disclaimer/" className="hover:text-mint-700">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {year} {SITE_NAME}. Built and maintained by {AUTHOR_NAME}. All processing happens in
        your browser.
      </div>
    </footer>
  );
}
