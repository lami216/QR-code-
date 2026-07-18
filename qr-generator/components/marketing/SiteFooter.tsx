import Link from "next/link";
export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-lg font-bold text-white">QR Studio</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
            A straightforward, privacy-friendly tool for creating custom QR
            codes in your browser.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Tools & resources</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/generator">QR generator</Link>
            <Link href="/create-qr-code">Create a QR code</Link>
            <Link href="/blog">QR code guides</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Company</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} QR Studio. Test every QR code before
        publishing.
      </div>
    </footer>
  );
}
