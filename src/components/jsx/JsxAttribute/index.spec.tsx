/**
 * File: /src/components/jsx/JsxAttribute/index.spec.tsx
 * Project: react-ast
 * File Created: 28-11-2023 02:58:22
 * Author: Clay Risser
 * -----
 * BitSpur (c) Copyright 2019 - 2023
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import JsxAttribute from "./index";
import React from "react";
import { ArrowFunctionExpression } from "../../../components";
import { render } from "../../../index";

describe("<JsxAttribute />", () => {
  it("renders", async () => {
    const code = await render(<JsxAttribute name="a" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("a");
  });

  it("renders with children", async () => {
    const code = await render(
      <JsxAttribute name="a" debug>
        <ArrowFunctionExpression />
      </JsxAttribute>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("a={() => {}}");
  });

  it("renders with children as string", async () => {
    const code = await render(
      <JsxAttribute name="a" debug>
        hello
      </JsxAttribute>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('a="hello"');
  });
});
