/*
 *  File: /src/render.ts
 *  Project: react-ast
 *  File Created: 28-11-2023 15:06:23
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

import * as t from "@babel/types";
import Renderer from "./reconciler";
import generate from "@babel/generator";
import prettier from "prettier";
import type { BundleType, Options } from "./types";
import type { Options as PrettierOptions } from "prettier";
import { File } from "./elements";
import { dev } from "./util";
import { updateContext } from "./context";

console.log("prettier", prettier);

export function renderAst(
  element: JSX.Element,
  options: Options = {},
  ast: t.File = t.file(t.program([]), [], []),
): t.File {
  updateContext({ parserOptions: options.parserOptions || {} });
  const file = new File();
  file.node = ast;
  const root = Renderer.createContainer(
    file,
    0,
    null,
    false,
    null,
    "react_ast_",
    (_err: Error) => undefined,
    null,
  );
  Renderer.updateContainer(element, root, null, () => undefined);
  Renderer.injectIntoDevTools({
    bundleType: Number(dev) as BundleType,
    rendererPackageName: "react-ast",
    version: "0.2",
    // version: pkg.version
  });
  return file.node as t.File;
}

export async function render(
  element: JSX.Element,
  options: Options = {},
  ast: t.File = t.file(t.program([]), [], []),
): Promise<string> {
  options = {
    prettier: true,
    ...options,
  };
  const { code } = generate(
    renderAst(element, options, ast),
    options.generatorOptions || {},
  );
  if (options.prettier) {
    return prettier.format(code, {
      ...(typeof options.prettier === "boolean" ? {} : options.prettier),
      plugins: [...((options?.prettier as PrettierOptions)?.plugins || [])],
      parser: "babel",
    });
  }
  return code;
}
