/** Assignment 05 regression tests for runtime-invalid context/fixture data.
 * TEST_SOURCE_ROOT is used ONLY to demonstrate the defects in the preserved
 * baseline; the default target is this final repository.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === './time' && context.parentURL?.includes('/src/utils/')) {
      return nextResolve('./time.ts', context);
    }
    return nextResolve(specifier, context);
  },
});

const sourceRoot = process.env.TEST_SOURCE_ROOT || fileURLToPath(new URL('../', import.meta.url));
const { checkAvailability } = await import(pathToFileURL(path.join(sourceRoot, 'src/utils/availability.ts')).href);
const { explainAvailability } = await import(pathToFileURL(path.join(sourceRoot, 'src/utils/explanation.ts')).href);
const booking = Object.freeze({ start: 600, end: 660 });
const defaultInput = Object.freeze({ start: 660, end: 720, currentTime: 540, blocked: false, bookings: [booking] });
const check = (changes = {}) => checkAvailability({ ...defaultInput, ...changes });

// R01: corrupted runtime 'now' must never authorize a booking slot.
for (const [label, currentTime] of [
  ['R01-a NaN', Number.NaN],
  ['R01-b Infinity', Number.POSITIVE_INFINITY],
  ['R01-c fractional', 540.5],
  ['R01-d negative', -1],
  ['R01-e beyond day', 1441],
]) {
  test(label, () => assert.deepEqual(check({ currentTime }), { available: false, reason: 'invalid_interval' }));
}

// R02: malformed schedule data must fail closed rather than silently allow
// or throw a runtime error. It is a data-integrity error, not a free slot.
for (const [label, bookings] of [
  ['R02-a NaN endpoint', [{ start: Number.NaN, end: 720 }]],
  ['R02-b reversed booking', [{ start: 720, end: 600 }]],
  ['R02-c invalid midnight bound', [{ start: 600, end: 1441 }]],
  ['R02-d null record', [null]],
  ['R02-e nonarray schedule', null],
]) {
  test(label, () => assert.deepEqual(check({ bookings }), { available: false, reason: 'invalid_schedule' }));
}

test('R02-f valid schedule still permits boundary touching', () => {
  assert.deepEqual(check(), { available: true, reason: 'ok' });
});

test('R02-g invalid schedule does not mutate input', () => {
  const bookings = [{ start: 700, end: 690 }];
  const before = structuredClone(bookings);
  check({ bookings });
  assert.deepEqual(bookings, before);
});

// Ensure the new fail-closed reason is explainable without contradicting status.
test('R02-h invalid schedule explanation is unavailable and consistent', async () => {
  const result = check({ bookings: [{ start: Number.NaN, end: 700 }] });
  assert.equal(result.available, false);
  const output = await explainAvailability({
    roomLabel: 'A101', startTime: '11:00', endTime: '12:00',
    isAvailable: result.available, reasonCode: result.reason,
  });
  assert.equal(output.source, 'mock');
  assert.match(output.explanation, /invalid/i);
});
