import { Classed } from './classed';
import { ClassValueType } from './classed-types';

export function classed(classes?: ClassValueType) {
  return new Classed(classes);
}
