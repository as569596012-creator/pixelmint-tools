import Link from "next/link";
import { getTool, relatedTools } from "@/lib/tools";
import ImageToolClient from "@/components/ImageToolClient";
import Faq from "@/components/Faq";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import {
  softwareAppJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

export default function ToolPageView({ slug }: { slug: string }) {
  const tool = getTool(slug);
  if (!tool) return null;
  const related = relatedTools(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={[
          softwareAppJsonLd(tool),
          faqJsonLd(tool),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: tool.name, path: `/${tool.slug}/` },
          ]),
        ]}
      />

      {/* 面包屑 */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-mint-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{tool.name}</span>
      </nav>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {tool.h1}
      </h1>
      <p className="mt-3 text-lg text-gray-600">{tool.intro}</p>

      {/* 工具本体放最上方,符合"打开即用" */}
      <div className="mt-6">
        <ImageToolClient tool={tool} />
      </div>

      {/* 使用步骤 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">How to use</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-gray-600">
          {tool.howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <div className="mt-8">
        <AdSlot />
      </div>

      {/* 正文说明 */}
      <section className="prose-tool mt-8">
        <h2 className="text-xl font-bold text-gray-900">About this tool</h2>
        <p className="mt-3">{tool.body}</p>
      </section>

      <Faq items={tool.faq} />

      {/* 相关工具(内链,提升整站权重) */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Related tools</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}/`}
              className="rounded-xl border border-gray-200 bg-white p-4 text-sm transition hover:border-mint-300 hover:shadow-sm"
            >
              <span className="text-xl">{r.emoji}</span>
              <div className="mt-1 font-semibold text-gray-900">{r.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
