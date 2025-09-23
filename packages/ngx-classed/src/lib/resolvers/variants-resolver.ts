import { ClassValueType } from '../classed-types';
import { coerceClassValueToString } from '../utils';
import { BaseResolver } from './base-resolver';

export class VariantsResolver extends BaseResolver<
  Record<string, Record<string, ClassValueType>>
> {
  override resolve(
    data: Record<string, Record<string, ClassValueType>>,
    source: Record<string, unknown>
  ): string {
    if (!data || !source) {
      return '';
    }
    let classes = '';
    for (const key in source) {
      const value = source[key];
      if (value && data[key] && data[key][String(value)]) {
        classes += coerceClassValueToString(data[key][String(value)]) + ' ';
      }
    }
    return classes.trim();
  }
}
