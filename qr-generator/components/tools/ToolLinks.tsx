import Link from "next/link";
import { specializedTools, toolPath } from "@/lib/seo/tools";

export function ToolLinks({
  heading = "Choose a focused QR tool",
}: {
  heading?: string;
}) {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12"
      aria-labelledby="qr-tools-heading"
    >
      <h2 id="qr-tools-heading" className="text-2xl font-black sm:text-3xl">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-5">
        {specializedTools.map((tool) => (
          <li key={tool.slug}>
            <Link
              className="block h-full rounded-xl border border-slate-200 p-3 text-sm font-bold text-teal-700 hover:border-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 sm:p-4 sm:text-base dark:border-slate-700 dark:text-teal-300"
              href={toolPath(tool.slug)}
            >
              {tool.heading}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
