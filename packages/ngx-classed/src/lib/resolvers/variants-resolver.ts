import {
  ClassValue,
  VariantClassMap,
  VariantDefinitionShape,
  VariantValue,
} from '../classed-types';
import { coerceClassValueToString } from '../utils';

function toVariantKey(value: unknown): string {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return String(value);
}

export function resolveVariants<T extends VariantDefinitionShape>(
  variants: VariantClassMap<T>,
  source: VariantValue<T>
): string {
  let classNames = '';
  for (const [key, value] of Object.entries(source)) {
    if (value === undefined || value === null) {
      continue;
    }

    const variantGroup = variants[key as keyof T];

    if (!variantGroup) {
      continue;
    }

    const variant = (variantGroup as Record<string, ClassValue>)[
      toVariantKey(value)
    ];

    if (!variant) {
      continue;
    }
    classNames += coerceClassValueToString(variant) + ' ';
  }
  return classNames;
}
