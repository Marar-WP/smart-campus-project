/** Single fictional room used by the availability-only demo. */
export const DEMO_ROOM = {
  name: "A101",
  currentTime: 540, // 09:00
  bookings: [{ start: 600, end: 660 }], // 10:00-11:00
} as const;
