/**
 * File: /src/components/jsx/JsxExpressionContainer/index.spec.tsx
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

import JsxExpressionContainer from "./index";
import React from "react";
import { ArrowFunctionExpression } from "../../../components";
import { render } from "../../../index";

describe("<JsxExpressionContainer />", () => {
  it("renders empty", async () => {
    const code = await render(<JsxExpressionContainer debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("{}");
  });

  it("renders with children example", async () => {
    const code = await render(
      <JsxExpressionContainer debug>
        <ArrowFunctionExpression />
      </JsxExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("{() => {}}");
  });

  it("renders with children as string", async () => {
    const code = await render(
      <JsxExpressionContainer debug>hello</JsxExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('{"hello"}');
  });

  it("renders with children as number", async () => {
    const code = await render(
      <JsxExpressionContainer debug>{0}</JsxExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("{0}");
  });

  it("renders with children as object", async () => {
    const code = await render(
      <JsxExpressionContainer debug>
        {{ hello: "world" }}
      </JsxExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`{{
  "hello": "world"
}}`);
  });

  it("renders with children as array", async () => {
    const code = await render(
      <JsxExpressionContainer debug>{[1, 2, 3]}</JsxExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("{[1, 2, 3]}");
  });
});
