import Ast from './Ast';
import Expression from './Expression';
import File from './File';
import Program from './Program';
import Smart from './Smart';
import { IElement } from './BaseElement';

export interface Elements {
  [key: string]: IElement;
}

export { Ast, Expression, File, Program, Smart };
export default { Ast, Expression, File, Program, Smart } as Elements;
