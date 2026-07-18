import { AdSlot } from "./AdSlot";
export function BannerAd({ className = "" }: { className?: string }) {
  return (
    <AdSlot
      slot={process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT}
      format="banner"
      className={className}
    />
  );
}
