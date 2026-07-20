import type { QRHistoryItem } from "../../types";

export const MAX_HISTORY_ITEMS = 20;
/** WiFi credentials are intentionally excluded from browser history. */
export function historyWithSafeItem(
  item: QRHistoryItem,
  existing: QRHistoryItem[],
): QRHistoryItem[] {
  if (item.content.type === "wifi") return existing;
  return [item, ...existing].slice(0, MAX_HISTORY_ITEMS);
}
