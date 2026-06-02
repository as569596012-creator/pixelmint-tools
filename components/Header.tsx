import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-mint-500 text-white">
            P
          </span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="hidden gap-5 text-sm font-medium text-gray-600 sm:flex">
          {TOOLS.map((t) => (
            <Link key={t.slug} href={`/${t.slug}/`} className="hover:text-mint-700">
              {t.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
