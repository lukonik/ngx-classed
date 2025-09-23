import { computed } from '@angular/core';
import { ClassValueType, ClassVariantType, SourceType } from './classed-types';
import { coerceClassValueToString } from './utils';

abstract class SourceRegistry<T> {
  constructor(public readonly source: SourceType<T | undefined>) {}

  abstract resolve(): ClassValueType | undefined;
}

class VarianceSourceRegistry extends SourceRegistry<string> {
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

export class Classed {
  private _registry = new Set<SourceRegistry<unknown>>();
  constructor(private _classes?: ClassValueType) {}

  var(variants: ClassVariantType, source: SourceType<string>) {
    this._registry.add(new VarianceSourceRegistry(variants, source));
    return this;
  }

  private resolve() {
    let classes = '';
    if (this._classes) {
      classes += coerceClassValueToString(this._classes) + ' ';
    }
    for (const registry of this._registry) {
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
