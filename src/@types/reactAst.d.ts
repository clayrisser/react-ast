/*
 *  File: /src/@types/reactAst.d.ts
 *  Project: react-ast
 *  File Created: 28-11-2023 06:49:40
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

declare namespace JSX {
  type PublicReplacements = import("@babel/template").PublicReplacements;
  type ReactNode = import("react").ReactNode;
  type Ref<T> = import("react").Ref<T>;
  type TemplateBuilderOptions =
    import("@babel/template").TemplateBuilderOptions;

  interface DeepArray<T> extends Array<T | DeepArray<T>> {}

  type Path = string | number | DeepArray<string | number>;

  interface HashMap<T = any> {
    [key: string]: T;
  }

  interface IntrinsicElements {
    Ast: {
      ast: HashMap;
      bodyPath?: Path;
      children?: ReactNode;
      parentBodyPath?: Path;
      ref?: Ref<any>;
      scopePath?: Path;
    };
    ExpressionElement: {
      bodyPath?: Path;
      children?: ReactNode;
      code: string;
      options?: TemplateBuilderOptions;
      ref?: Ref<any>;
      replacements?: PublicReplacements;
    };
    File: {
      ref?: Ref<any>;
      children?: ReactNode;
    };
    Program: {
      ref?: Ref<any>;
    };
    SmartElement: {
      bodyPath?: Path;
      children?: ReactNode;
      code: string;
      deletePaths?: Path | Path[];
      options?: TemplateBuilderOptions;
      parentBodyPath?: Path;
      ref?: Ref<any>;
      replacements?: PublicReplacements;
      scopePath?: Path;
    };
  }
}
