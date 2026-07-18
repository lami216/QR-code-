type AdSlotProps = {
  slot?: string;
  format?: "banner" | "rectangle" | "sidebar";
  label?: string;
  className?: string;
};

export function AdSlot({
  slot,
  format = "banner",
  label = "Advertisement",
  className = "",
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const heights = {
    banner: "min-h-24",
    rectangle: "min-h-52",
    sidebar: "min-h-[360px]",
  };
  return (
    <aside
      aria-label={label}
      className={`${heights[format]} ${className} flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center dark:border-slate-800 dark:bg-slate-900/50`}
    >
      {client && slot ? (
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">
            {label}
          </span>
          <p className="mt-1 text-xs text-slate-400">Reserved ad space</p>
        </div>
      )}
    </aside>
  );
}
