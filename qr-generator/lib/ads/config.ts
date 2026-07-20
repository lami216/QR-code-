const configuredClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

export const adsenseClient = configuredClient?.startsWith("ca-pub-")
  ? configuredClient
  : undefined;

export const displayAdSlots = {
  banner: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT,
  content: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT,
  faq: process.env.NEXT_PUBLIC_ADSENSE_FAQ_SLOT,
} as const;

export const hasDisplayAds = Boolean(adsenseClient);

export function hasDisplayAd(slot?: string) {
  return hasDisplayAds && Boolean(slot?.trim());
}

export const hasSidebarAd = hasDisplayAd(displayAdSlots.sidebar);
