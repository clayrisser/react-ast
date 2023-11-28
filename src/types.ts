import { GeneratorOptions } from "@babel/generator";
import { Node as BabelNode, Comment, SourceLocation } from "@babel/types";
import { Options as PrettierOptions } from "prettier";
import { TemplateBuilderOptions } from "@babel/template";

export interface HashMap<T = any> {
  [key: string]: T;
}

export interface BaseNode {
  leadingComments: ReadonlyArray<Comment> | null;
  innerComments: ReadonlyArray<Comment> | null;
  trailingComments: ReadonlyArray<Comment> | null;
  start: number | null;
  end: number | null;
  loc: SourceLocation | null;
  type: BabelNode["type"];
}

export type BundleType = 0 | 1;

export type Type = string;

export type Prop = any;

export type ContextItem = any;

export type HydratableInstance = any;

export type PublicInstance = Instance | TextInstance;

export type HostContext = Context;

export type UpdatePayload = any;

export type ChildSet = any;

export type TimeoutHandle = any;

export type NoTimeout = any;

export type SuspenseInstance = any;

export interface Container extends Instance {}

export interface TextInstance extends Instance {}

export interface DeepArray<T> extends Array<T | DeepArray<T>> {}

export type Path = JSX.Path;

export interface Props {
  [key: string]: Prop;
}

export interface Instance {
  appendChild(child: Instance | TextInstance): void;
  children: Instance[];
  commitMount(): void;
  commitUpdate(newProps: Props): void;
  node: Node;
  props: Props;
  removeChild(child: Instance | TextInstance): void;
}

export interface Pkg {
  [key: string]: any;
}

export interface Context {
  [key: string]: ContextItem;
}

export interface Node extends BaseNode {
  body?: BaseNode[];
}

export interface Options {
  generatorOptions?: GeneratorOptions;
  parserOptions?: TemplateBuilderOptions;
  prettier?: boolean | PrettierOptions;
}
