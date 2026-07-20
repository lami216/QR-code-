"use client";

import type React from "react";
import { FaQrcode, FaSpinner } from "react-icons/fa";

interface QRPreviewProps {
  qrCode: string;
  size?: number;
  isLoading?: boolean;
  className?: string;
  previewStyle?: "card" | "phone" | "poster";
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  qrCode,
  size = 280,
  isLoading = false,
  className = "",
  previewStyle = "card",
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-[300px] transition-all duration-300 ${className}`}
      >
        <div className="relative mb-4">
          <div className="relative w-16 h-16">
            <FaSpinner className="w-full h-full text-teal-600 dark:text-teal-400 animate-spin" />
            <FaQrcode className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">
          Generating QR Code
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
          Creating your custom design...
        </p>
      </div>
    );
  }

  // Empty state - check if qrCode is empty or invalid
  if (!qrCode || qrCode === "data:") {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 min-h-[300px] transition-all duration-300 ${className}`}
      >
        <FaQrcode className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">
          QR Code Preview
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
          Your QR code will appear here once generated
        </p>
        <div className="flex space-x-2">
          {[0, 0.1, 0.2].map((delay) => (
            <div
              key={delay}
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // QR Code preview
  return (
    <div
      className={`flex flex-col items-center transition-all duration-300 ${className}`}
    >
      <div className="mb-4 text-center">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
          Preview
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Real-time preview of your QR code
        </p>
      </div>

      <div
        className={`relative p-4 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 group ${previewStyle === "phone" ? "rounded-[2rem] border-8 border-slate-900" : previewStyle === "poster" ? "rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 p-8" : "rounded-xl"}`}
      >
        {/* biome-ignore lint/performance/noImgElement: locally generated data URLs cannot use Next Image optimization */}
        <img
          src={qrCode}
          alt="Generated QR code preview"
          className="transition-all duration-300 ease-out group-hover:scale-105 mx-auto"
          style={{
            width: size,
            height: size,
            minWidth: size,
            minHeight: size,
          }}
          onError={(e) => {
            console.error("Failed to load QR code image");
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Scan indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg transition-all duration-300">
          Scan Ready
        </div>
      </div>

      {/* Size indicator */}
      <div className="mt-3 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          {size} × {size}px •{" "}
          {previewStyle === "phone"
            ? "Mobile mockup"
            : previewStyle === "poster"
              ? "Poster preview"
              : "Clean card"}
        </span>
      </div>
    </div>
  );
};

export default QRPreview;
