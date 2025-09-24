import { computed } from '@angular/core';
import {
  ClassedOptions,
  VariantDefinitionShape,
  VariantValue,
} from './classed-types';
import { resolveCompoundVariants } from './resolvers/compound-variants-resolver';
import { resolveVariants } from './resolvers/variants-resolver';
import { coerceClassValueToString } from './utils';

export function classed<T extends VariantDefinitionShape>(options: ClassedOptions<T>) {
  return (value: () => VariantValue<T>) =>
    computed(() => {
      let classes = '';

      if (options.base) {
        classes += coerceClassValueToString(options.base) + ' ';
      }

      if (options.variants) {
        classes += resolveVariants(options.variants, value());
      }

      if (options.compoundVariants) {
        classes += resolveCompoundVariants(options.compoundVariants, value());
      }
      return classes;
    });
}
