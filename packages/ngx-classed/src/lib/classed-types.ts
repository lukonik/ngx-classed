export type NormalizeBooleanLiteral<T> = T extends 'true' | 'false'
  ? boolean
  : T;

export type ClassValue = string | string[] | null | undefined;

export type VariantClassMap = Record<string, Record<string, ClassValue>>;

export type CompoundVariantRule<T> = Array<{
  variants: { [key in keyof T]: NormalizeBooleanLiteral<keyof T[key]> };
  classes: ClassValue;
}>;

export type VariantValue<T extends VariantClassMap> = {
  [K in keyof T]?: NormalizeBooleanLiteral<keyof T[K]>;
};

export interface ClassedOptions<T extends VariantClassMap> {
  base?: NonNullable<ClassValue>;
  variants?: T;
  compoundVariants?: CompoundVariantRule<T>;
}
