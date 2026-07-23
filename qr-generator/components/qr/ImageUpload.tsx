"use client";

import { useRef, useState } from "react";
import { FaCheckCircle, FaImage, FaSpinner } from "react-icons/fa";
import {
  MAX_IMAGE_BYTES,
  MAX_IMAGE_DIMENSION,
  optimizeImage,
} from "../../lib/images/optimize";
import type { QRStyling } from "../../types";

export function ImageUpload({
  styling,
  onChange,
}: {
  styling: QRStyling;
  onChange: (value: QRStyling) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>();
  const [processing, setProcessing] = useState(false);

  const selectImage = async (file?: File) => {
    if (!file) return;
    setProcessing(true);
    setMessage(undefined);
    try {
      const result = await optimizeImage(file);
      onChange({
        ...styling,
        logo: result.file,
        logoDataUrl: result.dataUrl,
        logoSupport: true,
        logoSize: styling.logoSize ?? 18,
        logoPosition: styling.logoPosition ?? "center",
        logoPadding: styling.logoPadding ?? 2,
        logoBackground: styling.logoBackground ?? "white",
        errorCorrection: "H",
        margin: Math.max(4, styling.margin),
      });
      setMessage(
        result.wasOptimized
          ? `Optimized to ${result.width} × ${result.height}px`
          : "Image ready",
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Image could not be processed",
      );
    } finally {
      setProcessing(false);
      if (input.current) input.current.value = "";
    }
  };

  const hasError = message?.startsWith("Image ") && !message.includes("ready");
  return (
    <section
      aria-labelledby="image-upload-heading"
      className="rounded-xl border border-gray-100 bg-white p-3 shadow-lg sm:p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
        1. Add Image / Logo
      </p>
      <h2
        id="image-upload-heading"
        className="mt-1 text-xl font-semibold text-gray-900 dark:text-white"
      >
        Add your logo or image
      </h2>
      <button
        type="button"
        disabled={processing}
        onClick={() => input.current?.click()}
        className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-teal-500 hover:bg-teal-50 disabled:cursor-wait dark:border-gray-600 dark:hover:bg-teal-950/20"
      >
        {processing ? (
          <FaSpinner className="animate-spin text-teal-600" />
        ) : styling.logoDataUrl ? (
          <FaCheckCircle className="text-green-600" />
        ) : (
          <FaImage className="text-gray-400" />
        )}
        <span>
          <strong className="block text-gray-900 dark:text-white">
            {processing
              ? "Optimizing image…"
              : styling.logoDataUrl
                ? "Replace image"
                : "Upload image"}
          </strong>
          <small className="text-gray-500">
            PNG, JPG or WEBP · optimized to {MAX_IMAGE_DIMENSION}px /{" "}
            {MAX_IMAGE_BYTES / 1024 / 1024}MB
          </small>
        </span>
      </button>
      <input
        ref={input}
        className="sr-only"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => void selectImage(event.target.files?.[0])}
      />
      {message && (
        <p
          role={hasError ? "alert" : "status"}
          className={`mt-2 text-sm ${hasError ? "text-red-600" : "text-green-700 dark:text-green-400"}`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
