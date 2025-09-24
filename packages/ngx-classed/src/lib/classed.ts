import { computed } from '@angular/core';
import { ClassedOptions, VariantClassMap, VariantValue } from './classed-types';
import { resolveVariants } from './resolvers/variants-resolver';
import { coerceClassValueToString } from './utils';

export function classed<T extends VariantClassMap>(options: ClassedOptions<T>) {
  return (value: () => VariantValue<T>) =>
    computed(() => {
      let classes = '';

      if (options.base) {
        classes += coerceClassValueToString(options.base) + ' ';
      }

      if (options.variants) {
        classes += resolveVariants(options.variants, value());
      }
      return classes;
    });
}
