import { ClassValueType } from './classed-types';

/**
 * Normalizes a class value into a space-delimited string.
 * @param classes - The class value to normalize, which can be a string, an array of strings, null, or undefined.
 * @returns A string containing the class names separated by spaces.
 */
export function coerceClassValueToString(classes: ClassValueType): string {
  if (classes == null || classes === undefined) {
    return '';
  }
  if (Array.isArray(classes)) {
    return classes.join(' ');
  }
  return classes;
}
