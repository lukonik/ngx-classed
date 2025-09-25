jest.mock('@angular/core', () => {
  const computedMock = jest.fn((factory: () => string) => {
    const signal = () => factory();
    return signal;
  });

  return {
    computed: computedMock,
  };
});

import { computed } from '@angular/core';
import { classed } from './classed';
import {
  ClassValue,
  CompoundVariantOptions,
  VariantOptions,
  VariantValue,
} from './classed-types';
import * as compoundVariantsResolver from './resolvers/compound-variants-resolver';
import * as variantsResolver from './resolvers/variants-resolver';

describe('classed', () => {
  type VariantShape = {
    color: Record<'primary' | 'secondary', ClassValue>;
    size: Record<'sm' | 'lg', ClassValue>;
    disabled: boolean;
    tone: Record<'light' | 'dark', ClassValue>;
    elevation: 0 | 1 | 2;
  };

  const toVariantValue = (
    value: Record<string, unknown>
  ): VariantValue<VariantShape> => value as unknown as VariantValue<VariantShape>;

  const baseVariants: VariantOptions<VariantShape> = {
    color: {
      primary: 'text-blue-500',
      secondary: 'text-gray-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  };

  const baseCompounds: CompoundVariantOptions<VariantShape> = [
    {
      variants: { color: 'primary', size: 'lg' },
      classes: 'primary-lg',
    },
    {
      variants: { disabled: true },
      classes: 'disabled-state',
    },
    {
      variants: { tone: 'dark', elevation: 2 },
      classes: ['shadow-xl', 'ring-2'],
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('coerces base class arrays into a space-delimited string', () => {
    const getClasses = classed<VariantShape>({
      base: ['btn', 'rounded'],
    })(() => toVariantValue({}));

    expect(getClasses()).toBe('btn rounded ');
    expect((computed as jest.Mock).mock.calls).toHaveLength(1);
  });

  it('aggregates base, variant, and compound classes when all options are provided', () => {
    const getClasses = classed<VariantShape>({
      base: 'btn-base',
      variants: baseVariants,
      compoundVariants: baseCompounds,
    })(() =>
      toVariantValue({
        color: 'primary',
        size: 'lg',
        disabled: true,
        tone: 'dark',
        elevation: 2,
      })
    );

    expect(getClasses()).toBe(
      'btn-base text-blue-500 text-lg primary-lg disabled-state shadow-xl ring-2 '
    );
  });

  it('does not invoke resolveVariants when no variant map is provided', () => {
    const variantsSpy = jest.spyOn(variantsResolver, 'resolveVariants');

    const getClasses = classed<VariantShape>({
      base: 'btn-base',
    })(() => toVariantValue({ color: 'primary' }));

    expect(getClasses()).toBe('btn-base ');
    expect(variantsSpy).not.toHaveBeenCalled();
  });

  it('does not invoke resolveCompoundVariants when no compound definitions exist', () => {
    const compoundSpy = jest.spyOn(
      compoundVariantsResolver,
      'resolveCompoundVariants'
    );

    const getClasses = classed<VariantShape>({
      variants: baseVariants,
    })(() => toVariantValue({ color: 'primary' }));

    expect(getClasses()).toBe('text-blue-500 ');
    expect(compoundSpy).not.toHaveBeenCalled();
  });

  it('recomputes classes each time the underlying value changes', () => {
    const compoundVariants: CompoundVariantOptions<VariantShape> = [
      {
        variants: { size: 'lg' },
        classes: 'is-large',
      },
      {
        variants: { size: 'sm' },
        classes: 'is-small',
      },
    ];

    let currentValue = toVariantValue({
      color: 'primary',
      size: 'lg',
    });

    const value = jest.fn(() => currentValue);

    const getClasses = classed<VariantShape>({
      base: 'btn-base',
      variants: baseVariants,
      compoundVariants,
    })(value);

    expect(getClasses()).toBe('btn-base text-blue-500 text-lg is-large ');

    currentValue = toVariantValue({
      color: 'secondary',
      size: 'sm',
    });

    expect(getClasses()).toBe('btn-base text-gray-500 text-sm is-small ');
    expect(value).toHaveBeenCalledTimes(4);
  });
});
