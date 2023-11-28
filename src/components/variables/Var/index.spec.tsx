/**
 * File: /src/components/variables/Var/index.spec.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:05:44
 * Author: Lalit rajak
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

import React from "react";
import { ArrowFunctionExpression, TypeAnnotation, VarKind } from "../..";
import { render } from "../../../index";
import Var from "./index";

describe("<Var />", () => {
  it("renders", () => {
    const code = render(<Var name="v" debug />, {
      prettier: false,
    });
    expect(code).toBe("var v;");
  });

  it("renders as kind var", () => {
    const code = render(
      <Var kind={VarKind.Var} name="v" typeAnnotation="T" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("var v: T;");
  });

  it("renders as kind const", () => {
    const code = render(
      <Var
        kind={VarKind.Const}
        name="c"
        typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("const c: T;");
  });

  it("renders as kind let", () => {
    const code = render(<Var kind={VarKind.Let} name="l" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("let l;");
  });

  it("renders with children", () => {
    const code = render(
      <Var name="v" typeAnnotation={<TypeAnnotation>T</TypeAnnotation>} debug>
        <ArrowFunctionExpression />
      </Var>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("var v: T = () => {};");
  });

  it("renders with children as string", () => {
    const code = render(
      <Var name="v" typeAnnotation={<TypeAnnotation>T</TypeAnnotation>} debug>
        hello
      </Var>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('var v: T = "hello";');
  });
});
