const isValidBug = require('../utils/ValidateBug');

describe('Bug Validator', () => {
  it('returns true for valid bug', () => {
    const bug = { title: 'Bug title' };
    expect(isValidBug(bug)).toBe(true);
  });

  it('returns false for missing title', () => {
    const bug = { description: 'No title here' };
    expect(isValidBug(bug)).toBe(false);
  });

  it('returns false for empty string title', () => {
    const bug = { title: '   ' };
    expect(isValidBug(bug)).toBe(false);
  });
});
