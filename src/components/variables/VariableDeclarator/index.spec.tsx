/**
 * File: /src/components/variables/VariableDeclarator/index.spec.tsx
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
import { render } from "../../../index";
import {
  ArrowFunctionExpression,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
} from "../..";
import VariableDeclarator from "./index";

describe("<VariableDeclarator />", () => {
  it("renders", async () => {
    const code = await render(<VariableDeclarator name="v" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("v");
  });

  it("renders with type annotation", async () => {
    const code = await render(
      <VariableDeclarator
        name="v"
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
    expect(code).toBe("v: T");
  });

  it("renders with nested type annotation", async () => {
    const code = await render(
      <VariableDeclarator
        name="v"
        typeAnnotation={
          <TypeAnnotation>
            <TypeReference name="T">
              <TypeParameterInstantiation>
                <TypeReference name="A" />
                <TypeReference name="B" />
              </TypeParameterInstantiation>
            </TypeReference>
          </TypeAnnotation>
        }
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v: T<A, B>");
  });

  it("renders with annotation as string", async () => {
    const code = await render(
      <VariableDeclarator name="v" typeAnnotation="T<A>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v: T<A>");
  });

  it("renders with initial value as string", async () => {
    const code = await render(
      <VariableDeclarator name="v" typeAnnotation="T<A>" debug>
        hello
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('v: T<A> = "hello"');
  });

  it("renders with initial value as boolean", async () => {
    const code = await render(
      <VariableDeclarator name="v" typeAnnotation="T<A>" debug>
        {true}
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v: T<A> = true");
  });

  it("renders with initial value as number", async () => {
    const code = await render(
      <VariableDeclarator name="v" typeAnnotation="T<A>" debug>
        {0}
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v: T<A> = 0");
  });

  it("renders with initial value as object", async () => {
    const code = await render(
      <VariableDeclarator name="v" typeAnnotation="T<A>" debug>
        {{ hello: "world" }}
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`v: T<A> = {
  "hello": "world"
}`);
  });

  it("renders with initial value as component", async () => {
    const code = await render(
      <VariableDeclarator name="v" typeAnnotation="T<A>" debug>
        <ArrowFunctionExpression />
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v: T<A> = () => {}");
  });
});
