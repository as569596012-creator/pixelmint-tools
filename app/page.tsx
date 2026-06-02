import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import AdSlot from "@/components/AdSlot";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="text-center">
        <span className="inline-flex items-center rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-700">
          100% in your browser · No uploads · Free
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          {SITE_NAME} Image Tools
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{SITE_TAGLINE}</p>
      </section>

      <section className="mt-12 grid gap-5 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}/`}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-mint-300 hover:shadow-md"
          >
            <div className="text-3xl">{tool.emoji}</div>
            <h2 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-mint-700">
              {tool.name}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{tool.intro}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-mint-600">
              Open tool →
            </span>
          </Link>
        ))}
      </section>

      <div className="mt-12">
        <AdSlot />
      </div>

      <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-gray-900">Why use {SITE_NAME}?</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-gray-900">Private by design</h3>
            <p className="mt-1 text-sm text-gray-600">
              Every tool runs locally with the Canvas API and WebAssembly. Your images never
              leave your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">No sign-up, no watermark</h3>
            <p className="mt-1 text-sm text-gray-600">
              No accounts, no email, no limits, and no watermark added to your files. Just open
              and use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Fast and free</h3>
            <p className="mt-1 text-sm text-gray-600">
              No upload/download round-trip means instant results, even for batches of photos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
