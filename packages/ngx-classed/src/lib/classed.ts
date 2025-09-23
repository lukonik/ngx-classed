import { computed } from '@angular/core';
import { ClassValueType, ClassVariantType, SourceType } from './classed-types';
import { BaseResolver } from './resolvers/base-resolver';
import { IifResolver } from './resolvers/iif-resolver';
import { VariantResolver } from './resolvers/variant-resolver';
import { coerceClassValueToString } from './utils';

export class Classed {
  private _resolvers = new Set<BaseResolver<unknown>>();
  constructor(private _classes?: ClassValueType) {}

  var(variants: ClassVariantType, source: SourceType<string>) {
    this._resolvers.add(new VariantResolver(variants, source));
    return this;
  }

  iif(
    classes: {
      true: ClassValueType;
      false?: ClassValueType;
    },
    source: SourceType<boolean>
  ) {
    this._resolvers.add(new IifResolver(source, classes.true, classes.false));
    return this;
  }

  private resolve() {
    let classes = '';
    if (this._classes) {
      classes += coerceClassValueToString(this._classes) + ' ';
    }
    for (const registry of this._resolvers) {
      const resolveValue = registry.resolve();
      if (resolveValue) {
        classes += coerceClassValueToString(resolveValue) + ' ';
      }
    }
    return classes;
  }

  toSignal() {
    return computed<string>(() => this.resolve());
  }

  toClassString() {
    return this.resolve().trim();
  }
}
