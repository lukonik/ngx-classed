import { coerceClassValueToString } from './utils';

describe('coerceClassValueToString', () => {
  it('returns the original string when a string is provided', () => {
    expect(coerceClassValueToString('btn primary')).toBe('btn primary');
  });

  it('joins class names with spaces when an array is provided', () => {
    expect(coerceClassValueToString(['btn', 'primary', 'disabled'])).toBe(
      'btn primary disabled'
    );
  });

  it('should return an empty string when null or undefined is provided', () => {
    expect(coerceClassValueToString(null)).toBe('');
    expect(coerceClassValueToString(undefined)).toBe('');
  });

  it('should return an empty string when an empty array is provided', () => {
    expect(coerceClassValueToString([])).toBe('');
  });
});
