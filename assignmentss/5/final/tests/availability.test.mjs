import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === './time' && context.parentURL?.includes('/src/utils/')) {
      return nextResolve('./time.ts', context);
    }
    return nextResolve(specifier, context);
  },
});

const variant = process.env.BUG_VARIANT || 'availability';
if (!['availability', 'bug-a', 'bug-b'].includes(variant)) throw new Error('Invalid test variant');
const target = variant === 'availability' ? '../src/utils/availability.ts' : `./fixtures/${variant}.ts`;
const { checkAvailability, overlaps } = await import(target);
const { DEMO_ROOM } = await import('../src/data/roomFixture.ts');

const booking = { start: 600, end: 660 };
const base = { start: 660, end: 720, currentTime: 540, blocked: false, bookings: [booking] };

const check = (changes = {}) => checkAvailability({ ...base, ...changes });

test('T01: a free interval is available (AC5)', () => {
  assert.deepEqual(check(), { available: true, reason: 'ok' });
});

test('T02: start at or after end is rejected (AC1)', () => {
  assert.equal(check({ start: 700, end: 700 }).reason, 'invalid_interval');
  assert.equal(check({ start: 710, end: 700 }).reason, 'invalid_interval');
});

test('T03: past and current-time starts are rejected (AC1)', () => {
  assert.equal(check({ start: 500, end: 550 }).reason, 'invalid_interval');
  assert.equal(check({ start: 540, end: 600 }).reason, 'invalid_interval');
});

test('T04: intervals longer than 120 minutes are rejected (AC2)', () => {
  assert.equal(check({ start: 661, end: 782 }).reason, 'duration_too_long');
});

test('T05: blocked rooms are rejected (AC3)', () => {
  assert.equal(check({ blocked: true }).reason, 'room_blocked');
});

test('T06: an actual overlap is rejected (AC4)', () => {
  assert.equal(check({ start: 630, end: 690 }).reason, 'overlap');
});

test('T07: touching the booking start is allowed (BUG-A / AC4)', () => {
  assert.equal(check({ start: 570, end: 600 }).available, true);
  assert.equal(overlaps(570, 600, booking), false);
});

test('T08: touching the booking end is allowed (BUG-A / AC4)', () => {
  assert.equal(check({ start: 660, end: 720 }).available, true);
  assert.equal(overlaps(660, 720, booking), false);
});

test('T09: checking availability never mutates bookings (BUG-B / AC5)', () => {
  const bookings = [{ start: 800, end: 850 }, { start: 600, end: 660 }];
  const before = structuredClone(bookings);
  check({ bookings, start: 670, end: 720 });
  assert.deepEqual(bookings, before);
});

test('T10: minutes outside the day are rejected (AC1)', () => {
  assert.equal(check({ start: -1, end: 10 }).reason, 'invalid_interval');
  assert.equal(check({ start: 1410, end: 1441 }).reason, 'invalid_interval');
});

test('T11: exactly 120 minutes is allowed (AC2)', () => {
  assert.equal(check({ start: 660, end: 780 }).available, true);
});

test('T12: fractional minutes are rejected explicitly (AC1)', () => {
  assert.equal(check({ start: 660.5, end: 720 }).reason, 'invalid_interval');
  assert.equal(check({ start: 660, end: 720.5 }).reason, 'invalid_interval');
});

test('T13: non-finite inputs are rejected explicitly (AC1)', () => {
  assert.equal(check({ start: Number.NaN }).reason, 'invalid_interval');
  assert.equal(check({ end: Number.POSITIVE_INFINITY }).reason, 'invalid_interval');
});

test('T14: the final minute of the day is a valid free interval (AC1)', () => {
  assert.equal(check({ start: 1439, end: 1440 }).available, true);
});

test('T15: overlapping by just one minute is rejected (AC4)', () => {
  assert.equal(check({ start: 659, end: 700 }).reason, 'overlap');
});

test('T16: shared room fixture remains unchanged after checking (AC5)', () => {
  const before = structuredClone(DEMO_ROOM.bookings);
  checkAvailability({
    start: 660,
    end: 720,
    currentTime: DEMO_ROOM.currentTime,
    blocked: false,
    bookings: DEMO_ROOM.bookings,
  });
  assert.deepEqual(DEMO_ROOM.bookings, before);
});
