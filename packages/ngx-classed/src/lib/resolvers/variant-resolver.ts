import { ClassVariantType, SourceType, ClassValueType } from '../classed-types';
import { BaseResolver } from './base-resolver';

export class VariantResolver extends BaseResolver<string> {
  constructor(private _variants: ClassVariantType, source: SourceType<string>) {
    super(source);
  }

  override resolve(): ClassValueType | undefined {
    const sourceValue = this.source();
    if (sourceValue === undefined) {
      return undefined;
    }
    const variantValue = this._variants[sourceValue];
    return variantValue;
  }
}
