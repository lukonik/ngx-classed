import { ClassValueType } from './classed-types';

export function coerceClassValueToString(classes: ClassValueType): string {
  if (Array.isArray(classes)) {
    return classes.join(' ');
  }
  return classes;
}
