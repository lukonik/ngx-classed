import { ClassVariantType } from '../classed-types';
import { VariantResolver } from './variant-resolver';

describe('VariantResolver', () => {
  it('returns the variant value when the source matches a key', () => {
    const variants: ClassVariantType = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
    };
    const source = jest.fn().mockReturnValue('primary');

    const resolver = new VariantResolver(variants, source);

    expect(resolver.resolve()).toBe('btn-primary');
    expect(source).toHaveBeenCalledTimes(1);
  });

  it('returns null when the source produces undefined without a default', () => {
    const variants: ClassVariantType = {};
    const source = jest.fn().mockReturnValue(undefined);

    const resolver = new VariantResolver(variants, source);

    expect(resolver.resolve()).toBeNull();
  });

  it('returns null when no variant matches the key and no default is provided', () => {
    const variants: ClassVariantType = {
      primary: 'btn-primary',
    };
    const source = jest.fn().mockReturnValue('danger');

    const resolver = new VariantResolver(variants, source);

    expect(resolver.resolve()).toBeNull();
  });

  it('uses the default variant when the source produces undefined', () => {
    const variants: ClassVariantType = {
      default: 'btn-default',
    };
    const source = jest.fn().mockReturnValue(undefined);

    const resolver = new VariantResolver(variants, source);

    expect(resolver.resolve()).toBe('btn-default');
  });

  it('returns array variant values without modification', () => {
    const arrayVariant: string[] = ['btn', 'btn-primary'];
    const variants: ClassVariantType = {
      primary: arrayVariant,
    };
    const source = jest.fn().mockReturnValue('primary');

    const resolver = new VariantResolver(variants, source);

    expect(resolver.resolve()).toBe(arrayVariant);
  });

  it('re-evaluates the source for each resolve call', () => {
    let currentValue = 'primary';
    const variants: ClassVariantType = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
    };
    const source = jest.fn().mockImplementation(() => currentValue);

    const resolver = new VariantResolver(variants, source);

    expect(resolver.resolve()).toBe('btn-primary');

    currentValue = 'secondary';
    expect(resolver.resolve()).toBe('btn-secondary');

    expect(source).toHaveBeenCalledTimes(2);
  });

  it('allows using the default variant key explicitly', () => {
    const variants: ClassVariantType = {
      default: 'btn-default',
    };
    const source = jest.fn().mockReturnValue('default');

    const resolver = new VariantResolver(variants, source);

    expect(resolver.resolve()).toBe('btn-default');
  });
});
