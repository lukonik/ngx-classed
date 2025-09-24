import {
  CompoundVariantRule,
  VariantDefinitionShape,
  VariantValue,
} from '../classed-types';
import { coerceClassValueToString } from '../utils';

export function resolveCompoundVariants<T extends VariantDefinitionShape>(
  compoundVariant: CompoundVariantRule<T>,
  source: VariantValue<T>
): string {
  let classNames = '';

  for (const { variants, classes } of compoundVariant) {
    const matches = Object.entries(variants).every(([variantKey, expected]) => {
      const key = variantKey as keyof T;
      const actual = source[key];

      return actual === expected;
    });

    if (!matches) {
      continue;
    }

    classNames += coerceClassValueToString(classes) + ' ';
  }

  return classNames;
}
