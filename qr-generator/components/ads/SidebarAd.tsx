import { AdSlot } from "./AdSlot";
export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <AdSlot
      slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT}
      format="sidebar"
      className={className}
    />
  );
}
