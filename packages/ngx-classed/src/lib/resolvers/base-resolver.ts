import { SourceType, ClassValueType } from '../classed-types';

export abstract class BaseResolver<T> {
  constructor(public readonly source: SourceType<T | undefined>) {}

  abstract resolve(): ClassValueType;
}
