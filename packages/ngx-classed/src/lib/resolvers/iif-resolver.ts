import { ClassValueType, SourceType } from '../classed-types';
import { BaseResolver } from './base-resolver';

export class IifResolver extends BaseResolver<boolean> {
  constructor(
    source: SourceType<boolean>,
    private trueClasses: ClassValueType,
    private falseClasses?: ClassValueType
  ) {
    super(source);
  }

  override resolve(): ClassValueType {
    const value = this.source();
    if (value == true) {
      return this.trueClasses;
    }
    return this.falseClasses;
  }
}
