export type NormalizeBooleanLiteral<T> = T extends
  | 'true'
  | 'false'
  | true
  | false
  ? boolean
  : T;

export type ClassValue = string | string[] | null | undefined;

export type VariantDefinitionEntry =
  | string
  | number
  | boolean
  | Record<PropertyKey, ClassValue>;

export type VariantDefinitionShape = Record<string, VariantDefinitionEntry>;

type VariantKeyFromBoolean = 'true' | 'false';

type VariantRecordFromUnion<T> = Partial<
  Record<Extract<T, string | number>, ClassValue>
>;

type VariantRecordFromBoolean = Partial<
  Record<VariantKeyFromBoolean, ClassValue>
>;

type VariantEntryToClassMap<T> = T extends Record<PropertyKey, ClassValue>
  ? T
  : T extends boolean
  ? VariantRecordFromBoolean
  : VariantRecordFromUnion<T>;

export type VariantOptions<T extends VariantDefinitionShape> = {
  [K in keyof T]?: VariantEntryToClassMap<T[K]>;
};

type VariantEntryValue<T> = T extends Record<PropertyKey, ClassValue>
  ? keyof T
  : T;

export type VariantValue<T extends VariantDefinitionShape> = {
  [K in keyof T]?: NormalizeBooleanLiteral<VariantEntryValue<T[K]>>;
};

export type CompoundVariantOptions<T extends VariantDefinitionShape> = Array<{
  variants: {
    [K in keyof T]?: NormalizeBooleanLiteral<VariantEntryValue<T[K]>>;
  };
  classes: ClassValue;
}>;

export interface ClassedOptions<T extends VariantDefinitionShape> {
  base?: NonNullable<ClassValue>;
  variants?: VariantOptions<T>;
  compoundVariants?: CompoundVariantOptions<T>;
}
