import Ast from './Ast';
import Expression from './Expression';
import File from './File';
import Program from './Program';
import SmartElement from './SmartElement';
import { IElement } from './BaseElement';

export interface Elements {
  [key: string]: IElement<any>;
}

export { Ast, Expression, File, Program, SmartElement };

export default { Ast, Expression, File, Program, SmartElement } as Elements;
