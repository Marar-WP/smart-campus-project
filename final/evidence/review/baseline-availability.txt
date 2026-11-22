import { MIN_PER_DAY } from "./time";

export interface Booking {
  start: number;
  end: number;
}

export interface CheckInput {
  start: number;
  end: number;
  currentTime: number;
  blocked: boolean;
  bookings: readonly Readonly<Booking>[];
}

export type Reason =
  | "invalid_interval"
  | "duration_too_long"
  | "room_blocked"
  | "overlap"
  | "ok";

export interface CheckResult {
  available: boolean;
  reason: Reason;
}

/** Touching endpoints (start == booking.end or end == booking.start) are allowed. */
export function overlaps(start: number, end: number, booking: Booking): boolean {
  return start < booking.end && end > booking.start;
}

function overlapsExisting(start: number, end: number, bookings: readonly Readonly<Booking>[]): boolean {
  return bookings.some((b) => overlaps(start, end, b));
}

/**
 * AC1: accept only when 0 ≤ start < end ≤ 1440 and start strictly > currentTime.
 * AC2: reject when duration > 120 minutes.
 * AC3: reject when the room is blocked.
 * AC4: reject when the interval overlaps an existing booking (touching allowed).
 */
export function checkAvailability(input: CheckInput): CheckResult {
  const { start, end, currentTime, blocked, bookings } = input;

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    start >= end ||
    end > MIN_PER_DAY ||
    start <= currentTime
  ) {
    return { available: false, reason: "invalid_interval" };
  }
  if (end - start > 120) {
    return { available: false, reason: "duration_too_long" };
  }
  if (blocked) {
    return { available: false, reason: "room_blocked" };
  }
  if (overlapsExisting(start, end, bookings)) {
    return { available: false, reason: "overlap" };
  }
  return { available: true, reason: "ok" };
}

export const REASON_LABELS: Record<Reason, string> = {
  ok: "This time slot is available for booking.",
  invalid_interval:
    "Invalid interval. Start must be ≥ 00:00, end must be > start, end ≤ 24:00, and start must be after the current time.",
  duration_too_long: "Booking exceeds the 2-hour (120 minute) maximum duration.",
  room_blocked: "This room is currently blocked and cannot be booked.",
  overlap: "The requested interval overlaps an existing booking.",
};
