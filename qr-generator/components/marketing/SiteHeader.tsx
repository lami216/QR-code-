import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-slate-950 dark:text-white"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-xl bg-teal-600 text-white"
          >
            ▦
          </span>
          QR Studio
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          <Link href="/qr-code-generator">Generator</Link>
          <Link href="/create-qr-code">How it works</Link>
          <Link href="/qr-code-maker">QR maker</Link>
          <Link href="/blog">Guides</Link>
          <Link href="/about">About</Link>
        </div>
        <Link
          href="/generator"
          className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-700"
        >
          Create QR code
        </Link>
      </nav>
    </header>
  );
}
