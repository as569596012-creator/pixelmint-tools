"use client";

import { useCallback, useRef, useState } from "react";
import type { ToolDef } from "@/lib/tools";

type ItemStatus = "ready" | "processing" | "done" | "error";

interface WorkItem {
  id: string;
  file: File;
  originalSize: number;
  status: ItemStatus;
  resultUrl?: string;
  resultSize?: number;
  resultName?: string;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function changeExt(name: string, ext: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  return `${base}.${ext}`;
}

function isHeic(file: File): boolean {
  return (
    /heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name)
  );
}

// 用 canvas 把任意图片重新编码为目标格式(jpg 需要白底,因为不支持透明)
async function reencodeWithCanvas(
  source: Blob,
  mime: string,
  quality: number,
): Promise<Blob> {
  const url = URL.createObjectURL(source);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not read image"));
      el.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported in this browser");
    if (mime === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), mime, quality / 100),
    );
    if (!blob) throw new Error("This browser could not encode the chosen format");
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function ImageToolClient({ tool }: { tool: ToolDef }) {
  const { config } = tool;
  const [items, setItems] = useState<WorkItem[]>([]);
  const [quality, setQuality] = useState<number>(config.defaultQuality);
  const [targetKb, setTargetKb] = useState<number>(100);
  const [useTarget, setUseTarget] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const next: WorkItem[] = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/") || isHeic(f))
      .map((f) => ({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`,
        file: f,
        originalSize: f.size,
        status: "ready" as const,
      }));
    setItems((prev) => [...prev, ...next]);
  }, []);

  const processOne = useCallback(
    async (item: WorkItem): Promise<WorkItem> => {
      try {
        let blob: Blob;
        let outName = item.file.name;

        if (config.mode === "convert") {
          const mime = config.outputMime ?? "image/jpeg";
          if (config.acceptHeic && isHeic(item.file)) {
            const heic2any = (await import("heic2any")).default as (opts: {
              blob: Blob;
              toType?: string;
              quality?: number;
            }) => Promise<Blob | Blob[]>;
            const out = await heic2any({
              blob: item.file,
              toType: mime,
              quality: quality / 100,
            });
            blob = Array.isArray(out) ? out[0] : out;
          } else {
            blob = await reencodeWithCanvas(item.file, mime, quality);
          }
          outName = changeExt(item.file.name, config.outputExt ?? "jpg");
        } else {
          // compress 模式
          const imageCompression = (await import("browser-image-compression")).default;
          const options: Record<string, unknown> = {
            useWebWorker: true,
            initialQuality: quality / 100,
            alwaysKeepResolution: true,
          };
          if (useTarget && config.showTargetSize) {
            options.maxSizeMB = targetKb / 1024;
            delete options.alwaysKeepResolution;
          }
          blob = await imageCompression(item.file, options as never);
          outName = item.file.name;
        }

        const resultUrl = URL.createObjectURL(blob);
        return {
          ...item,
          status: "done",
          resultUrl,
          resultSize: blob.size,
          resultName: outName,
        };
      } catch (e) {
        return {
          ...item,
          status: "error",
          error: e instanceof Error ? e.message : "Processing failed",
        };
      }
    },
    [config, quality, targetKb, useTarget],
  );

  const run = useCallback(async () => {
    if (items.length === 0 || busy) return;
    setBusy(true);
    setItems((prev) => prev.map((it) => ({ ...it, status: "processing" as const })));
    const results: WorkItem[] = [];
    for (const item of items) {
      // eslint-disable-next-line no-await-in-loop
      const r = await processOne(item);
      results.push(r);
      setItems((prev) => prev.map((it) => (it.id === r.id ? r : it)));
    }
    setBusy(false);
  }, [items, busy, processOne]);

  const downloadOne = useCallback((item: WorkItem) => {
    if (!item.resultUrl || !item.resultName) return;
    const a = document.createElement("a");
    a.href = item.resultUrl;
    a.download = item.resultName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  const downloadAll = useCallback(() => {
    items.filter((it) => it.status === "done").forEach((it, i) => {
      setTimeout(() => downloadOne(it), i * 150);
    });
  }, [items, downloadOne]);

  const reset = useCallback(() => {
    items.forEach((it) => it.resultUrl && URL.revokeObjectURL(it.resultUrl));
    setItems([]);
    if (inputRef.current) inputRef.current.value = "";
  }, [items]);

  const doneCount = items.filter((it) => it.status === "done").length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      {/* 拖拽 / 选择区 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragOver ? "border-mint-500 bg-mint-50" : "border-gray-300 hover:border-mint-400 hover:bg-gray-50"
        }`}
      >
        <div className="text-3xl">{tool.emoji}</div>
        <p className="mt-2 text-base font-semibold text-gray-800">
          Drop images here or click to choose
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Files are processed in your browser and never uploaded.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={config.accept}
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* 选项 */}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {config.showQuality && (
          <label className="flex items-center gap-3 text-sm text-gray-700">
            <span className="font-medium">Quality</span>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="h-2 w-40 cursor-pointer accent-mint-600"
            />
            <span className="w-10 tabular-nums text-gray-500">{quality}</span>
          </label>
        )}

        {config.showTargetSize && (
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={useTarget}
              onChange={(e) => setUseTarget(e.target.checked)}
              className="h-4 w-4 accent-mint-600"
            />
            <span>Target size</span>
            <input
              type="number"
              min={5}
              value={targetKb}
              disabled={!useTarget}
              onChange={(e) => setTargetKb(Number(e.target.value))}
              className="w-20 rounded-md border border-gray-300 px-2 py-1 disabled:bg-gray-100"
            />
            <span>KB</span>
          </label>
        )}
      </div>

      {/* 动作按钮 */}
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={run}
          disabled={items.length === 0 || busy}
          className="rounded-lg bg-mint-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-mint-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Working…" : config.mode === "compress" ? "Compress" : "Convert"}
        </button>
        {doneCount > 1 && (
          <button
            onClick={downloadAll}
            className="rounded-lg border border-mint-600 px-5 py-2.5 text-sm font-semibold text-mint-700 transition hover:bg-mint-50"
          >
            Download all ({doneCount})
          </button>
        )}
        {items.length > 0 && (
          <button
            onClick={reset}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>

      {/* 结果列表 */}
      {items.length > 0 && (
        <ul className="mt-6 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200">
          {items.map((it) => {
            const reduced =
              it.resultSize !== undefined && it.originalSize > 0
                ? Math.round((1 - it.resultSize / it.originalSize) * 100)
                : null;
            return (
              <li key={it.id} className="flex items-center justify-between gap-3 p-3 text-sm">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-800">{it.file.name}</div>
                  <div className="text-gray-500">
                    {formatBytes(it.originalSize)}
                    {it.resultSize !== undefined && (
                      <>
                        {" → "}
                        <span className="font-medium text-mint-700">
                          {formatBytes(it.resultSize)}
                        </span>
                        {reduced !== null && reduced > 0 && (
                          <span className="ml-1 text-mint-600">(-{reduced}%)</span>
                        )}
                      </>
                    )}
                    {it.status === "error" && (
                      <span className="ml-1 text-red-600">{it.error}</span>
                    )}
                  </div>
                </div>
                <div className="shrink-0">
                  {it.status === "processing" && (
                    <span className="text-gray-400">…</span>
                  )}
                  {it.status === "done" && (
                    <button
                      onClick={() => downloadOne(it)}
                      className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-700"
                    >
                      Download
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
