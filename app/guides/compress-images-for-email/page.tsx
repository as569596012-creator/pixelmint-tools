import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/GuideLayout";
import { buildMetadata } from "@/lib/seo";
import { getGuide } from "@/lib/guides";

const SLUG = "compress-images-for-email";
const guide = getGuide(SLUG)!;

export const metadata: Metadata = buildMetadata({
  title: guide.title,
  description: guide.metaDescription,
  path: `/guides/${SLUG}/`,
  keywords: guide.keywords,
});

export default function Page() {
  return (
    <GuideLayout slug={SLUG}>
      <p>
        <strong>Quick answer:</strong> to email a photo that is too large, drop it into a
        browser-based{" "}
        <Link href="/image-compressor/" className="text-mint-700 underline">
          image compressor
        </Link>
        , lower the quality to around 60–70, and download the smaller file. A typical 8 MB phone
        photo shrinks to under 1 MB with no visible quality loss — small enough to attach to any
        email instantly.
      </p>

      <h2 className="text-xl font-bold text-gray-900">Why your email won&apos;t send</h2>
      <p>
        Email was never designed to move large files. Every provider enforces a hard cap on the
        total size of a message and its attachments. Modern phone cameras produce 4–12 MB photos, so
        attaching just two or three pictures can push you over the limit and bounce the message
        back.
      </p>
      <p>The common limits today:</p>
      <ul className="ml-5 list-disc space-y-1 text-gray-600">
        <li>
          <strong>Gmail:</strong> 25 MB per message (larger files are auto-converted to Google Drive
          links)
        </li>
        <li>
          <strong>Outlook / Microsoft 365:</strong> 20 MB (often lowered to 10 MB by company admins)
        </li>
        <li>
          <strong>Apple Mail / iCloud:</strong> 20 MB (Mail Drop kicks in above that)
        </li>
        <li>
          <strong>Yahoo Mail:</strong> 25 MB
        </li>
      </ul>
      <p>
        Note that attachments are encoded for transit, which adds roughly 33% overhead. A 20 MB cap
        realistically means keeping your files under about 15 MB — and well below that if you want
        the email to arrive quickly on a phone.
      </p>

      <h2 className="text-xl font-bold text-gray-900">
        Step by step: compress an image for email
      </h2>
      <ol className="ml-5 list-decimal space-y-2 text-gray-600">
        <li>
          Open the{" "}
          <Link href="/image-compressor/" className="text-mint-700 underline">
            free image compressor
          </Link>{" "}
          and drop in your photo (or several at once).
        </li>
        <li>
          Drag the quality slider down to about <strong>60–70</strong> and watch the output size
          update live.
        </li>
        <li>
          When the file is comfortably under your provider&apos;s limit, click{" "}
          <strong>Download</strong> (or &quot;Download all&quot; for a batch).
        </li>
        <li>Attach the smaller files to your email as usual.</li>
      </ol>
      <p>
        Everything happens inside your browser using the Canvas API and WebAssembly — your photos
        are never uploaded to a server, which is both faster and far more private than tools that
        require you to hand over your files.
      </p>

      <h2 className="text-xl font-bold text-gray-900">What quality setting should I use?</h2>
      <p>
        For photos you are emailing to friends, family or colleagues, <strong>quality 60–70</strong>{" "}
        is the sweet spot — the difference is invisible on a screen, but the file gets 70–90%
        smaller. Only go higher (85+) if the recipient will print the image or zoom in on fine
        detail. Going below 50 starts to introduce visible blockiness, so avoid it unless you
        genuinely need a tiny file.
      </p>

      <h2 className="text-xl font-bold text-gray-900">
        Still too big? Resize before you compress
      </h2>
      <p>
        Compression alone is usually enough, but if you are emailing a huge, high-resolution image
        (say, a 6000-pixel-wide photo) you can shrink it further by reducing its dimensions first.
        Nobody viewing an email needs an image wider than about 2000 pixels. Use the{" "}
        <Link href="/image-resizer/" className="text-mint-700 underline">
          image resizer
        </Link>{" "}
        to set the width to 1500–2000 px, then run it through the compressor. Resizing cuts file
        size dramatically because it removes pixels the recipient would never see anyway.
      </p>

      <h2 className="text-xl font-bold text-gray-900">Frequently asked questions</h2>
      <p>
        <strong>Does compressing an image lower its quality?</strong> Technically yes — JPEG
        compression is lossy — but at quality 60–70 the loss is invisible at normal viewing sizes
        while the file shrinks enormously.
      </p>
      <p>
        <strong>Can I compress images on my phone?</strong> Yes. Open the compressor in your mobile
        browser, pick a photo from your camera roll, and download the smaller version. No app to
        install.
      </p>
      <p>
        <strong>Is it safe to compress private or sensitive photos?</strong> With a browser-based
        tool like this one, yes — the file is processed locally on your device and never sent
        anywhere. You can confirm this by opening your browser&apos;s Network tab while you compress.
      </p>
    </GuideLayout>
  );
}
