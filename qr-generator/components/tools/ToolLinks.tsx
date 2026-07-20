import Link from "next/link";
import { specializedTools, toolPath } from "@/lib/seo/tools";

export function ToolLinks({
  heading = "Choose a focused QR tool",
}: {
  heading?: string;
}) {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6"
      aria-labelledby="qr-tools-heading"
    >
      <h2 id="qr-tools-heading" className="text-3xl font-black">
        {heading}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {specializedTools.map((tool) => (
          <li key={tool.slug}>
            <Link
              className="block h-full rounded-xl border border-slate-200 p-4 font-bold text-teal-700 hover:border-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-slate-700 dark:text-teal-300"
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
