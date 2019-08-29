import Expression from './Expression';
import File from './File';
import Program from './Program';
import Smart from './Smart';
import { ElementConstructor } from './Element';

export interface Elements {
  [key: string]: ElementConstructor;
}

export { Expression, File, Program, Smart };
export default {
  Expression,
  File,
  Program,
  Smart
} as Elements;
