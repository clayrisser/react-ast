/*
 *  File: /src/types.ts
 *  Project: react-ast
 *  File Created: 28-11-2023 02:58:22
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2019 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import type { Comment, SourceLocation } from "@babel/types";
import type { GeneratorOptions } from "@babel/generator";
import type { Meta } from "./elements/BaseElement";
import type { Options as PrettierOptions } from "prettier";
import type { TemplateBuilderOptions } from "@babel/template";

export interface BaseNode {
  type: string;
  leadingComments?: Comment[] | null;
  innerComments?: Comment[] | null;
  trailingComments?: Comment[] | null;
  start?: number | null;
  end?: number | null;
  loc?: SourceLocation | null;
  range?: [number, number];
  extra?: Record<string, unknown>;
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
  appendChild: (child: Instance | TextInstance) => void;
  children: Instance[];
  commitMount: () => void;
  commitUpdate: (newProps: Props) => void;
  node: Node;
  props: Props;
  removeChild: (child: Instance | TextInstance) => void;
  meta: Meta;
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
