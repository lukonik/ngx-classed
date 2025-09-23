import { computed } from '@angular/core';
import { ClassedFactoryType } from './classed-factory';
import { BaseResolver } from './resolvers/base-resolver';
import { CompoundVariantsResolver } from './resolvers/compound-variants-resolver';
import { VariantsResolver } from './resolvers/variants-resolver';
import { coerceClassValueToString } from './utils';

const RESOLVERS = {
  variant: new VariantsResolver(),
  compoundVariants: new CompoundVariantsResolver(),
};
export class Classed {
  private _resolvers = new Set<BaseResolver<unknown>>();
  constructor(private _classedFactoryType: ClassedFactoryType) {}

  // var<T extends string>(
  //   variants: ClassVariantType<T>,
  //   source: SourceType<string>
  // ) {
  //   this._resolvers.add(new VariantResolver(variants, source));
  //   return this;
  // }

  // multiVar(multiVar: MultiVariantType, source: SourceType<any>) {
  //   this._resolvers.add(new MultiVariantResolver(multiVar, source));
  //   return this;
  // }

  // // iif(
  // //   classes: {
  // //     true: ClassValueType;
  // //     false?: ClassValueType;
  // //   },
  // //   source: SourceType<boolean>
  // // ) {
  // //   this._resolvers.add(new IifResolver(source, classes.true, classes.false));
  // //   return this;
  // // }

  private resolve(source: Record<string, unknown>) {
    let classes = '';
    if (this._classedFactoryType.base) {
      classes += coerceClassValueToString(this._classedFactoryType.base) + ' ';
    }
    if (this._classedFactoryType.variants) {
      classes += coerceClassValueToString(
        RESOLVERS['variant'].resolve(this._classedFactoryType.variants, source)
      );
    }
    if (this._classedFactoryType.compoundVariants) {
      classes +=
        ' ' +
        RESOLVERS.compoundVariants.resolve(
          this._classedFactoryType.compoundVariants,
          source
        );
    }
    // for (const registry of this._resolvers) {
    //   const resolveValue = registry.resolve();
    //   if (resolveValue) {
    //     classes += coerceClassValueToString(resolveValue) + ' ';
    //   }
    // }
    return classes;
  }

  toSignal(source: () => Record<string, unknown>) {
    return computed<string>(() => this.resolve(source()));
  }

  toClassString() {
    // return this.resolve().trim();
  }
}
