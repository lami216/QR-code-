import Link from "next/link";
import type { Guide } from "@/lib/seo/guides";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-black">
        <Link className="hover:text-teal-700" href={`/guides/${guide.slug}`}>
          {guide.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">
        {guide.description}
      </p>
      <Link
        className="mt-5 font-bold text-teal-700 dark:text-teal-300"
        href={`/guides/${guide.slug}`}
      >
        Read the guide →
      </Link>
    </article>
  );
}
