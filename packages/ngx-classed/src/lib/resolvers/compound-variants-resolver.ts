import {
  CompoundVariantRule,
  VariantClassMap,
  VariantValue,
} from '../classed-types';

export function resolveCompoundVariants<T extends VariantClassMap>(
  compoundVariant: CompoundVariantRule<T>,
  source: VariantValue<T>
): string {}
