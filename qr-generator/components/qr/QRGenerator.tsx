"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { FaArrowLeft, FaBolt, FaDownload, FaMagic } from "react-icons/fa";
import { useQRGenerator } from "../../hooks/useQRGenerator";
import { displayAdSlots, hasSidebarAd } from "../../lib/ads/config";
import type { QRType } from "../../lib/qr/modes";
import { AdSlot } from "../ads/AdSlot";
import { SidebarAd } from "../ads/SidebarAd";
import { QRConfigurator } from "./ContentForm";
import { DownloadControls } from "./DownloadControls";
import { QRPreview } from "./QRPreview";
import { StylingControls } from "./StylingControls";

export type QRGeneratorProps = { initialType?: QRType };

export function QRGenerator({ initialType }: QRGeneratorProps) {
  const {
    content,
    setContent,
    styling,
    setStyling,
    qrCode,
    generateQR,
    generateQRAuto,
    isLoading,
    error,
    clearError,
  } = useQRGenerator(initialType);

  // Optimized auto-generation with proper content checking
  useEffect(() => {
    let mounted = true;

    const generateWithDelay = async () => {
      const hasValidContent = () => {
        if (!content.data) return false;

        if (typeof content.data === "string") {
          return content.data.trim().length > 0;
        }

        switch (content.type) {
          case "wifi":
            return (content.data as any).ssid?.trim().length > 0;
          case "email":
            return (content.data as any).address?.trim().length > 0;
          case "vcard": {
            const vcard = content.data as any;
            return (
              vcard.firstName?.trim().length > 0 ||
              vcard.lastName?.trim().length > 0
            );
          }
          case "event":
            return (content.data as any).title?.trim().length > 0;
          default:
            return true;
        }
      };

      if (!hasValidContent()) return;

      await new Promise((resolve) => setTimeout(resolve, 800));
      if (mounted) {
        await generateQRAuto();
      }
    };

    generateWithDelay();
    return () => {
      mounted = false;
    };
  }, [content, generateQRAuto]);

  const handleManualGenerate = useCallback(async () => {
    await generateQR();
  }, [generateQR]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-2">
              <FaMagic className="text-2xl text-teal-600 dark:text-teal-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                QR Studio
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex justify-between items-center shadow-lg animate-fade-in">
            <span className="flex items-center space-x-2">
              <FaBolt className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm sm:text-base">{error}</span>
            </span>
            <button
              type="button"
              onClick={clearError}
              className="text-red-700 hover:text-red-900 font-bold text-lg ml-4 transition-colors"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 dark:from-white dark:to-teal-400 bg-clip-text text-transparent mb-3">
            QR Studio
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Create and customize your QR code in real-time with instant preview
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-xl">
                    <FaBolt className="text-teal-600 dark:text-teal-400 text-lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Content details
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      Configure content and design settings
                    </p>
                  </div>
                </div>
                <QRConfigurator
                  content={content}
                  onContentChange={setContent}
                />
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
              <div className="p-6">
                <StylingControls styling={styling} onChange={setStyling} />
              </div>
            </section>

            {/* Manual Generate Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleManualGenerate}
                disabled={isLoading || !content.data}
                className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center gap-2 shadow-lg disabled:cursor-not-allowed"
              >
                <FaBolt className={isLoading ? "animate-spin" : ""} />
                {isLoading ? "Generating..." : "Refresh Preview"}
              </button>
            </div>
          </div>

          {/* Right Column - Preview & Download */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-xl">
                    <FaDownload className="text-green-600 dark:text-green-400 text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Preview & Download
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Real-time preview and export options
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <QRPreview
                    qrCode={qrCode}
                    size={Math.min(styling.size, 280)}
                    isLoading={isLoading}
                    previewStyle={styling.previewStyle ?? "card"}
                    className="w-full"
                  />
                </div>

                <DownloadControls
                  qrCode={qrCode}
                  styling={styling}
                  isLoading={isLoading}
                />
              </div>
            </section>
          </div>
        </div>
        <AdSlot
          slot={displayAdSlots.content}
          format="banner"
          className="my-10"
        />
        <section
          className={`grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 ${hasSidebarAd ? "lg:grid-cols-[1fr_280px]" : ""}`}
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create, test and publish with confidence
            </h2>
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              QR Studio creates static QR codes directly in your browser, so no
              content upload is required. Choose the content type, adjust the
              design and scan the preview before downloading. For print, use
              strong contrast, preserve the clear margin around the code and
              test a physical proof at its intended size.
            </p>
            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              PNG is convenient for digital use, while SVG offers scalable
              artwork and PDF supports common document workflows. Static QR
              codes do not expire, but their encoded content cannot be changed
              after download.
            </p>
            <h3 className="mt-6 text-xl font-bold">Before you publish</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
              <li>Scan the exported file with more than one phone.</li>
              <li>
                For print, test a physical proof at its final size and viewing
                distance.
              </li>
              <li>
                Keep a clear quiet zone and use dark modules on a light
                background.
              </li>
              <li>
                Use high error correction with a logo, then verify every
                destination.
              </li>
            </ul>
            <p className="mt-5">
              <Link
                className="font-semibold text-teal-700 underline dark:text-teal-300"
                href="/guides/qr-code-not-scanning"
              >
                Troubleshoot a QR code that will not scan
              </Link>
              {" · "}
              <Link
                className="font-semibold text-teal-700 underline dark:text-teal-300"
                href="/guides/best-qr-code-size-for-print"
              >
                Choose a print size
              </Link>
            </p>
          </div>
          <SidebarAd className="hidden lg:flex" />
        </section>
      </div>
    </div>
  );
}
