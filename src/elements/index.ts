import File from './File';
import Program from './Program';
import Smart from './Smart';
import { ElementConstructor } from './Element';

export interface Elements {
  [key: string]: ElementConstructor;
}

export { File, Program, Smart };
export default {
  File,
  Program,
  Smart
} as Elements;
