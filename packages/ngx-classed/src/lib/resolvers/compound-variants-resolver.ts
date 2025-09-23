import { ClassValueType } from '../classed-types';
import { coerceClassValueToString } from '../utils';
import { BaseResolver } from './base-resolver';

export class CompoundVariantsResolver extends BaseResolver<
  Array<{
    variants: Record<string, string | boolean>;
    classes: ClassValueType;
  }>
> {
  override resolve(
    data: Array<{
      variants: Record<string, string | boolean>;
      classes: ClassValueType;
    }>,
    source: Record<string, unknown>
  ): string {
    let classes: ClassValueType = '';
    data.forEach((item) => {
      let isMatch = true;
      for (const [key, value] of Object.entries(item.variants)) {
        if (source[key] !== value) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        classes += ' ' + coerceClassValueToString(item.classes);
      }
    });
    return classes.trim();
  }
}
