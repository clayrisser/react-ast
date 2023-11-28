import Ast from "./Ast";
import ExpressionElement from "./ExpressionElement";
import File from "./File";
import Program from "./Program";
import SmartElement from "./SmartElement";
import { IElement } from "./BaseElement";

export interface Elements {
  [key: string]: IElement<any>;
}

export { Ast, ExpressionElement, File, Program, SmartElement };

export default {
  Ast,
  ExpressionElement,
  File,
  Program,
  SmartElement,
} as Elements;
