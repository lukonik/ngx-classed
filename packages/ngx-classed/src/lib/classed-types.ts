import { Signal } from '@angular/core';

export type ClassValueType = string | string[];

export type ClassVariantType = Record<string, ClassValueType>;

export type SourceType<T> = () => T | undefined;

export interface SourceRegistry {
  source: SourceType<unknown>;
}
