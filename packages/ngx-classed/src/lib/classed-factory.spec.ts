import { Classed } from './classed';
import { classed } from './classed-factory';

describe('classed factory', () => {
  it('should create an instance of Classed', () => {
    const instance = classed('test');
    expect(instance).toBeInstanceOf(Classed);
  });

  it('should accept initial classes', () => {
    const instance = classed('initial-class');
    expect(instance.toClassString()).toBe('initial-class');
  });

  it('should return empty string if no classes are provided', () => {
    const instance = classed();
    expect(instance.toClassString()).toBe('');
  });
});
