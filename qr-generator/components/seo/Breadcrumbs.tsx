import Link from "next/link";

export type BreadcrumbItem = { name: string; path: string };

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-slate-600 dark:text-slate-400"
    >
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.path}>
            {index > 0 && <span aria-hidden="true">/ </span>}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
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
