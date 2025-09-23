export type ClassValueType = string | string[] | null | undefined;
export type ClassValueTypeStrict = string | string[];
export type ClassVariantType<TKey extends string = string> = Record<
  TKey,
  ClassValueTypeStrict
> & { default?: ClassValueTypeStrict };

export type SourceType<T> = () => T | undefined;

export interface MultiVariantSingleType {
  classes: ClassValueTypeStrict;
  variants: Record<string, any>;
}

export type MultiVariantType = Array<MultiVariantSingleType>;
