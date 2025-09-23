import { Classed } from './classed';
import { ClassValueType } from './classed-types';

export type ClassVariantType = Record<string, Record<string, ClassValueType>>;

export interface ClassedFactoryType {
  base?: ClassValueType;
  variants?: Record<string, Record<string, ClassValueType>>;
  compoundVariants?: Array<{
    variants: Record<string, string | boolean>;
    classes: ClassValueType;
  }>;
}

export function classed(classes: ClassedFactoryType) {
  return new Classed(classes);
}
