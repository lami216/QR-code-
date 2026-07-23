import Link from "next/link";

export type BreadcrumbItem = { name: string; path: string };

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-7xl px-4 py-3 text-xs text-slate-600 sm:px-6 sm:py-4 sm:text-sm dark:text-slate-400"
    >
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.path}>
            {index > 0 && <span aria-hidden="true">/ </span>}
            {index === items.length - 1 ? (
              <span
                className="font-medium text-slate-800 dark:text-slate-200"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link className="underline hover:text-teal-700" href={item.path}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
