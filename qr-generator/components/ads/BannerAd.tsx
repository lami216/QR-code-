import { displayAdSlots } from "@/lib/ads/config";
import { AdSlot } from "./AdSlot";

export function BannerAd({ className = "" }: { className?: string }) {
  return (
    <AdSlot
      slot={displayAdSlots.banner}
      format="banner"
      className={className}
    />
  );
}
