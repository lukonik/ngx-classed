import { resolveVariants } from './variants-resolver';
import { ClassValue, VariantClassMap, VariantValue } from '../classed-types';

describe('resolveVariants', () => {
  type VariantShape = {
    color: Record<'primary' | 'secondary', ClassValue>;
    size: Record<'sm' | 'lg', ClassValue>;
    disabled: boolean;
    spacing: Record<'compact' | 'cozy', ClassValue>;
    elevation: 0 | 1 | 2;
  };

  const baseVariants: VariantClassMap<VariantShape> = {
    color: {
      primary: 'text-blue-500',
      secondary: 'text-gray-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
    disabled: {
      true: 'opacity-50',
      false: 'opacity-100',
    },
    spacing: {
      compact: ['px-2', 'py-1'],
      cozy: ['px-4', 'py-2'],
    },
    elevation: {
      0: 'shadow-none',
      1: 'shadow-sm',
      2: 'shadow-md',
    },
  };

  const toVariantValue = (
    value: Record<string, unknown>
  ): VariantValue<VariantShape> => value as unknown as VariantValue<VariantShape>;

  it('returns a concatenated string of classes for matching variants', () => {
    const result = resolveVariants(baseVariants, {
      color: 'primary',
      size: 'lg',
      disabled: true,
    });

    expect(result).toBe('text-blue-500 text-lg opacity-50 ');
  });

  it('coerces array class values into a space-delimited string', () => {
    const result = resolveVariants(baseVariants, {
      spacing: 'cozy',
    });

    expect(result).toBe('px-4 py-2 ');
  });

  it('ignores variant keys that are not defined in the variant map', () => {
    const result = resolveVariants(
      baseVariants,
      toVariantValue({
        color: 'secondary',
        unknown: 'value',
      })
    );

    expect(result).toBe('text-gray-500 ');
  });

  it('ignores variant values without a matching class definition', () => {
    const result = resolveVariants(
      baseVariants,
      toVariantValue({
        size: 'xl',
        color: 'secondary',
      })
    );

    expect(result).toBe('text-gray-500 ');
  });

  it('skips null and undefined variant values', () => {
    const result = resolveVariants(
      baseVariants,
      toVariantValue({
        color: null,
        size: undefined,
        disabled: false,
      })
    );

    expect(result).toBe('opacity-100 ');
  });

  it('coerces boolean and numeric variant values to their string keys', () => {
    const result = resolveVariants(baseVariants, {
      disabled: false,
      elevation: 2,
    });

    expect(result).toBe('opacity-100 shadow-md ');
  });

  it('returns an empty string when no variant produced a class', () => {
    const result = resolveVariants(
      baseVariants,
      toVariantValue({
        color: null,
        size: undefined,
      })
    );

    expect(result).toBe('');
  });
});
