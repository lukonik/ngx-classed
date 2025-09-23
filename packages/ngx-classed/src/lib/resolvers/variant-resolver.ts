import { ClassVariantType, SourceType, ClassValueType } from '../classed-types';
import { BaseResolver } from './base-resolver';

export class VariantResolver extends BaseResolver<string> {
  constructor(private _variants: ClassVariantType, source: SourceType<string>) {
    super(source);
  }

  override resolve(): ClassValueType {
    const sourceValue = this.source();
    if (sourceValue === undefined || sourceValue === null) {
      return this._variants.default ?? null;
    }

    const variantValue = this._variants[sourceValue];
    if (variantValue === undefined) {
      return null;
    }

    return variantValue;
  }
}
