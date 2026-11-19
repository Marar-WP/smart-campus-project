/** Minutes-since-midnight <-> "HH:MM" helpers. */

export const MIN_PER_DAY = 1440;

export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60) % 24;
  const m = Math.floor(min) % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function timeToMinutes(time: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(time.trim());
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}
