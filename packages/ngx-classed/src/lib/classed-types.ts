export type ClassValueType = string | string[];

export type ClassVariantType = Record<string, ClassValueType>;

export type SourceType<T> = () => T | undefined;
