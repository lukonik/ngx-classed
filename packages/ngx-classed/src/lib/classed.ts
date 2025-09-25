import { computed } from '@angular/core';
import {
  ClassedOptions,
  VariantDefinitionShape,
  VariantValue,
} from './classed-types';
import { resolveCompoundVariants } from './resolvers/compound-variants-resolver';
import { resolveVariants } from './resolvers/variants-resolver';
import { coerceClassValueToString } from './utils';

/**
 * Creates a type-safe, variant-based class name generator that returns Angular computed signals.
 *
 * This function enables dynamic styling with TypeScript safety by defining base classes,
 * variants, and compound variants that can be resolved at runtime into CSS class strings.
 *
 * @template T - The variant definition shape extending VariantDefinitionShape
 * @param options - Configuration object containing base classes, variants, and compound variants
 * @param options.base - Base CSS classes to always include (string, array, or object)
 * @param options.variants - Object mapping variant names to their possible values and associated classes
 * @param options.compoundVariants - Array of compound variant definitions that apply classes when multiple conditions are met
 *
 * @returns A function that accepts a variant value provider and returns a computed signal with resolved class names
 *
 * @example
 * Case 1: Declare classed outside component (reusable across components):
 * ```typescript
 * // button.styles.ts
 * export const buttonClassed = classed({
 *   base: 'px-4 py-2 rounded font-medium',
 *   variants: {
 *     size: {
 *       sm: 'text-sm px-2 py-1',
 *       md: 'text-base px-4 py-2',
 *       lg: 'text-lg px-6 py-3'
 *     },
 *     variant: {
 *       primary: 'bg-blue-500 text-white hover:bg-blue-600',
 *       secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
 *     }
 *   }
 * });
 *
 * // button.component.ts
 * @Component({
 *   template: `<button [class]="buttonClass()">Click me</button>`
 * })
 * export class ButtonComponent {
 *   @Input() size: 'sm' | 'md' | 'lg' = 'md';
 *   @Input() variant: 'primary' | 'secondary' = 'primary';
 *
 *   buttonClass = buttonClassed(() => ({
 *     size: this.size,
 *     variant: this.variant
 *   }));
 * }
 * ```
 *
 * @example
 * Case 2: Declare classed inside component (component-specific styling):
 * ```typescript
 * @Component({
 *   template: `<div [class]="cardClass()">
 *     <h2 [class]="titleClass()">{{title}}</h2>
 *   </div>`
 * })
 * export class CardComponent {
 *   @Input() title = '';
 *   @Input() elevated = false;
 *   @Input() color: 'default' | 'primary' | 'success' = 'default';
 *
 *   private cardClassed = classed({
 *     base: 'rounded-lg p-6',
 *     variants: {
 *       elevated: {
 *         true: 'shadow-lg',
 *         false: 'shadow-sm'
 *       },
 *       color: {
 *         default: 'bg-white border border-gray-200',
 *         primary: 'bg-blue-50 border border-blue-200',
 *         success: 'bg-green-50 border border-green-200'
 *       }
 *     }
 *   });
 *
 *   private titleClassed = classed({
 *     base: 'text-xl font-semibold mb-2',
 *     variants: {
 *       color: {
 *         default: 'text-gray-900',
 *         primary: 'text-blue-900',
 *         success: 'text-green-900'
 *       }
 *     }
 *   });
 *
 *   cardClass = this.cardClassed(() => ({
 *     elevated: this.elevated,
 *     color: this.color
 *   }));
 *
 *   titleClass = this.titleClassed(() => ({
 *     color: this.color
 *   }));
 * }
 * ```
 */
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
