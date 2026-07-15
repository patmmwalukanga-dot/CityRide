export function formatFare(fare?: number): string {
  if (fare == null) return "—";
  return `K ${fare.toFixed(2)}`;
}

export function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleString();
}

export function uid(prefix = "id"): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
