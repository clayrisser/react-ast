/**
 * File: /src/components/variables/VariableDeclaration/index.spec.tsx
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
import {
  ArrowFunctionExpression,
  TypeAnnotation,
  VariableDeclarationKind,
  VariableDeclarator,
} from "../..";
import { render } from "../../../index";
import VariableDeclaration from "./index";

describe("<VariableDeclaration />", () => {
  it("renders", async () => {
    const code = await render(<VariableDeclaration debug />, {
      prettier: false,
    });
    expect(code).toBe("var ;");
  });

  it("renders as kind var", async () => {
    const code = await render(
      <VariableDeclaration kind={VariableDeclarationKind.Var} debug>
        <VariableDeclarator name="v" typeAnnotation="T" />
      </VariableDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("var v: T;");
  });

  it("renders as kind const", async () => {
    const code = await render(
      <VariableDeclaration kind={VariableDeclarationKind.Const} debug>
        <VariableDeclarator
          name="c"
          typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        />
      </VariableDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("const c: T;");
  });

  it("renders as kind let", async () => {
    const code = await render(
      <VariableDeclaration kind={VariableDeclarationKind.Let} debug>
        <VariableDeclarator name="l" />
      </VariableDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("let l;");
  });

  it("renders with children", async () => {
    const code = await render(
      <VariableDeclaration debug>
        <VariableDeclarator
          name="v"
          typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        >
          <ArrowFunctionExpression />
        </VariableDeclarator>
      </VariableDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("var v: T = () => {};");
  });

  it("renders with children as string", async () => {
    const code = await render(
      <VariableDeclaration debug>
        <VariableDeclarator
          name="v"
          typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        >
          hello
        </VariableDeclarator>
      </VariableDeclaration>,
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
