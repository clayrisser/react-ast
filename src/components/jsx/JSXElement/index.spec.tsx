/**
 * File: /src/components/jsx/JSXElement/index.spec.tsx
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

import JSXElement from "./index";
import React from "react";
import { Identifier, ArrowFunctionExpression } from "../../../components";
import { render } from "../../../index";

describe("<JSXElement />", () => {
  it("renders jsx element", () => {
    const code = render(<JSXElement name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello />");
  });

  it("renders jsx element with no name", () => {
    const code = render(<JSXElement debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<></>");
  });

  it("force no self closing", () => {
    const code = render(<JSXElement name="Hello" selfClosing={false} debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello></Hello>");
  });

  it("renders jsx no name with children", () => {
    const code = render(
      <JSXElement debug>
        <JSXElement name="World" />
      </JSXElement>,

      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<><World /></>");
  });

  it("renders jsx element with children", () => {
    const code = render(
      <JSXElement name="Hello" debug>
        <JSXElement name="World" />
      </JSXElement>,

      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello><World /></Hello>");
  });

  it("disable force self closing with children", () => {
    const code = render(
      <JSXElement name="Hello" selfClosing debug>
        <JSXElement name="World" />
      </JSXElement>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello><World /></Hello>");
  });

  it("renders jsx element with attributes", () => {
    const code = render(
      <JSXElement
        name="Hello"
        attributes={{
          a: <Identifier>a</Identifier>,
          b: "b",
          c: true,
          d: <ArrowFunctionExpression />,
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
    expect(code).toBe('<Hello a={a} b="b" c d={() => {}} />');
  });

  it("renders jsx element with attributes and children", () => {
    const code = render(
      <JSXElement
        name="Hello"
        attributes={{
          a: <Identifier>a</Identifier>,
          b: "b",
          c: true,
          d: <ArrowFunctionExpression />,
        }}
        debug
      >
        <JSXElement
          name="World"
          attributes={{
            a: <Identifier>a</Identifier>,
            b: "b",
            c: true,
            d: <ArrowFunctionExpression />,
          }}
          debug
        />
      </JSXElement>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(
      '<Hello a={a} b="b" c d={() => {}}><World a={a} b="b" c d={() => {}} /></Hello>',
    );
  });
});
