import { adsenseClient, hasDisplayAd } from "@/lib/ads/config";

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
  if (!hasDisplayAd(slot)) {
    return null;
  }

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
      <ins
        className="adsbygoogle block w-full"
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
