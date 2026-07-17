import type { Metadata, Viewport } from 'next'
import './globals.css'
import { registerServiceWorker } from '../lib/utils/pwa'

export const metadata: Metadata = {
  title: 'QR Studio - Free Custom QR Code Generator',
  description:
    'Create custom QR codes for free. No signup required. Generate QR codes for URLs, text, WiFi, contacts, and more.',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f766e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Client-side PWA registration
  if (typeof window !== 'undefined') {
    registerServiceWorker()
  }

  return (
    <html lang="en" className="h-full">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/qr-code.png" sizes="any" />
        <link rel="icon" type="image/png" href="/qr-code.png" />

        {/* Share / Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/qr-code.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content="#0f766e" />
      </head>

      <body
        className="h-full bg-slate-50 font-sans text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-50"
      >
        {children}
        {/* Removed <PWAPrompt /> to prevent "Download the App" nag */}
      </body>
    </html>
  )
}
