/**
 * File: /src/components/jsx/JsxOpeningElement/index.spec.tsx
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

import JsxOpeningElement from "./index";
import React from "react";
import { render } from "../../../index";
import {
  ArrowFunctionExpression,
  Identifier,
  JsxAttribute,
} from "../../../components";

describe("<JsxOpeningElement />", () => {
  it("renders", async () => {
    const code = await render(<JsxOpeningElement name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello>");
  });

  it("renders self closing", async () => {
    const code = await render(
      <JsxOpeningElement name="Hello" selfClosing debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello />");
  });

  it("renders with attribute", async () => {
    const code = await render(
      <JsxOpeningElement
        name="Hello"
        attributes={<JsxAttribute name="a">a</JsxAttribute>}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('<Hello a="a">');
  });

  it("renders with attribute as string", async () => {
    const code = await render(
      <JsxOpeningElement name="Hello" attributes="a" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello a>");
  });

  it("renders with attributes as array", async () => {
    const code = await render(
      <JsxOpeningElement
        name="Hello"
        attributes={[
          <JsxAttribute key={0} name="a">
            a
          </JsxAttribute>,
          <JsxAttribute key={1} name="b">
            <Identifier>b</Identifier>
          </JsxAttribute>,
        ]}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('<Hello a="a" b={b}>');
  });

  it("renders with attributes as string array", async () => {
    const code = await render(
      <JsxOpeningElement name="Hello" attributes={["a", "b", "c"]} debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello a b c>");
  });

  it("renders with attributes as object", async () => {
    const code = await render(
      <JsxOpeningElement
        name="Hello"
        attributes={{
          a: "a",
          b: <Identifier>b</Identifier>,
          c: <ArrowFunctionExpression />,
          d: true,
        }}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('<Hello a="a" b={b} c={() => {}} d>');
  });
});
