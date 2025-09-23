
export abstract class BaseResolver<T> {
  abstract resolve(data: T, source: any): string;
}
