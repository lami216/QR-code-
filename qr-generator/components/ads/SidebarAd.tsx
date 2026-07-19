import { displayAdSlots } from "@/lib/ads/config";
import { AdSlot } from "./AdSlot";

export function SidebarAd({ className = "" }: { className?: string }) {
  return (
    <AdSlot
      slot={displayAdSlots.sidebar}
      format="sidebar"
      className={className}
    />
  );
}
