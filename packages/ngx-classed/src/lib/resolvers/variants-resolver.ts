import { VariantClassMap, VariantValue } from '../classed-types';
import { coerceClassValueToString } from '../utils';

export function resolveVariants<T extends VariantClassMap>(
  variants: T,
  source: VariantValue<T>
): string {
  let classNames = '';
  for (const [key, value] of Object.entries(source)) {
    const variantGroup = variants[key];

    if (!variantGroup) {
      continue;
    }

    const variant = variantGroup[value];

    if (!variant) {
      continue;
    }
    classNames += coerceClassValueToString(variant) + ' ';
  }
  return classNames;
}
