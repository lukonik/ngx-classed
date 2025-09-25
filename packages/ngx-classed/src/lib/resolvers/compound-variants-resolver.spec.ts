import {
  ClassValue,
  CompoundVariantOptions,
  VariantValue,
} from '../classed-types';
import { resolveCompoundVariants } from './compound-variants-resolver';

describe('resolveCompoundVariants', () => {
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

  const compoundVariants: CompoundVariantOptions<VariantShape> = [
    {
      variants: { color: 'primary', size: 'lg' },
      classes: 'bg-blue-500 text-white',
    },
    {
      variants: { disabled: true },
      classes: 'opacity-50 cursor-not-allowed',
    },
    {
      variants: { tone: 'dark', elevation: 2 },
      classes: ['shadow-xl', 'ring-2'],
    },
    {
      variants: { size: 'sm' },
      classes: 'text-sm',
    },
  ];

  it('returns classes for each compound variant rule that matches the source', () => {
    const result = resolveCompoundVariants(
      compoundVariants,
      toVariantValue({
        color: 'primary',
        size: 'lg',
        disabled: true,
        tone: 'dark',
        elevation: 2,
      })
    );

    expect(result).toBe(
      'bg-blue-500 text-white opacity-50 cursor-not-allowed shadow-xl ring-2 '
    );
  });

  it('skips compound rules when one of the variant conditions does not match', () => {
    const result = resolveCompoundVariants(
      compoundVariants,
      toVariantValue({
        color: 'primary',
        size: 'lg',
        disabled: false,
        tone: 'light',
      })
    );

    expect(result).toBe('bg-blue-500 text-white ');
  });

  it('only matches when the source contains the expected boolean and numeric values', () => {
    const result = resolveCompoundVariants(
      [
        {
          variants: { disabled: true },
          classes: 'disabled',
        },
        {
          variants: { elevation: 1 },
          classes: 'shadow-sm',
        },
      ],
      toVariantValue({ disabled: 'true', elevation: 1 })
    );

    expect(result).toBe('shadow-sm ');
  });

  it('ignores rules whose variant keys are missing from the source', () => {
    const result = resolveCompoundVariants(
      [
        {
          variants: { size: 'sm', tone: 'dark' },
          classes: 'match-both',
        },
      ],
      toVariantValue({ size: 'sm' })
    );

    expect(result).toBe('');
  });

  it('matches rules that specify only a subset of the source variants', () => {
    const result = resolveCompoundVariants(
      compoundVariants,
      toVariantValue({
        size: 'sm',
        color: 'secondary',
        disabled: false,
      })
    );

    expect(result).toBe('text-sm ');
  });

  it('coerces array class values into space-delimited strings', () => {
    const result = resolveCompoundVariants(
      compoundVariants,
      toVariantValue({
        tone: 'dark',
        elevation: 2,
      })
    );

    expect(result).toBe('shadow-xl ring-2 ');
  });
});
