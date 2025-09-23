import { computed } from '@angular/core';
import { ClassValueType, ClassVariantType, SourceType } from './classed-types';
import { coerceClassValueToString } from './utils';
import { BaseResolver } from './resolvers/base-resolver';
import { VariantResolver } from './resolvers/variant-resolver';

export class Classed {
  private _resolvers = new Set<BaseResolver<unknown>>();
  constructor(private _classes?: ClassValueType) {}

  var(variants: ClassVariantType, source: SourceType<string>) {
    this._resolvers.add(new VariantResolver(variants, source));
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
