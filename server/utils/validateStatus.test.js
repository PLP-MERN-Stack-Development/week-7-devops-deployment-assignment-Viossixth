const isValidStatus = require('./validateStatus');

test('valid statuses are accepted', () => {
  expect(isValidStatus('open')).toBe(true);
  expect(isValidStatus('in-progress')).toBe(true);
  expect(isValidStatus('resolved')).toBe(true);
});

test('invalid statuses are rejected', () => {
  expect(isValidStatus('closed')).toBe(false);
  expect(isValidStatus('')).toBe(false);
  expect(isValidStatus(null)).toBe(false);
});
