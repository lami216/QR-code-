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
          <Link href="/generator">Generator</Link>
          <Link href="/generator#qr-tools-heading">QR tools</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/about">About</Link>
        </div>
        <details className="group relative ml-auto md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-xl border border-slate-300 px-3 text-sm font-bold text-slate-800 marker:content-none dark:border-slate-700 dark:text-white">
            <span className="sr-only">Open main navigation</span>
            <span aria-hidden="true">Menu</span>
          </summary>
          <div className="absolute right-0 top-13 z-50 grid min-w-48 gap-1 rounded-xl border border-slate-200 bg-white p-2 text-sm font-semibold text-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <Link
              className="rounded-lg px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="/generator"
            >
              Generator
            </Link>
            <Link
              className="rounded-lg px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="/generator#qr-tools-heading"
            >
              QR tools
            </Link>
            <Link
              className="rounded-lg px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="/guides"
            >
              Guides
            </Link>
            <Link
              className="rounded-lg px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
              href="/about"
            >
              About
            </Link>
          </div>
        </details>
        <Link
          href="/generator"
          className="ml-2 hidden min-h-11 items-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-700 sm:flex"
        >
          Create QR code
        </Link>
      </nav>
    </header>
  );
}
