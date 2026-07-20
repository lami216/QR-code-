import type { QRHistoryItem } from "../../types";

export const MAX_HISTORY_ITEMS = 20;
/** Removes legacy WiFi records while retaining unrelated history. */
export function sanitizeHistory(value: unknown): QRHistoryItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item): item is QRHistoryItem =>
        typeof item === "object" &&
        item !== null &&
        "content" in item &&
        typeof item.content === "object" &&
        item.content !== null &&
        "type" in item.content &&
        item.content.type !== "wifi",
    )
    .slice(0, MAX_HISTORY_ITEMS);
}
/** WiFi credentials are intentionally excluded from browser history. */
export function historyWithSafeItem(
  item: QRHistoryItem,
  existing: QRHistoryItem[],
): QRHistoryItem[] {
  if (item.content.type === "wifi") return existing;
  return [item, ...existing].slice(0, MAX_HISTORY_ITEMS);
}
