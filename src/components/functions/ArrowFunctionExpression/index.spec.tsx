/**
 * File: /src/components/functions/ArrowFunctionExpression/index.spec.tsx
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

import React from "react";
import { render } from "../../../index";
import ArrowFunctionExpression from "./index";
import {
  Identifier,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
  Var,
  VariableDeclaration,
  VariableDeclarator,
} from "../../../components";

describe("<ArrowFunctionExpression />", () => {
  it("renders empty function", () => {
    const code = render(<ArrowFunctionExpression debug />, {
      prettier: false,
    });
    expect(code).toBe("() => {}");
  });

  it("renders function with nested return type", () => {
    const code = render(
      <ArrowFunctionExpression
        returnType={
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
    expect(code).toBe("(): T<A, B> => {}");
  });

  it("renders function with return type as string", () => {
    const code = render(
      <ArrowFunctionExpression returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("(): T<A, B, C> => {}");
  });

  it("renders function with nested children", () => {
    const code = render(
      <ArrowFunctionExpression debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </ArrowFunctionExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`() => {
  var v: T = "hello";
}`);
  });

  it("renders function with params as string", () => {
    const code = render(
      <ArrowFunctionExpression params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("(a, b, c) => {}");
  });

  it("renders function with children as string", () => {
    const code = render(
      <ArrowFunctionExpression debug>const hello = 0;</ArrowFunctionExpression>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`() => {
  const hello = 0;
}`);
  });

  it("renders function with typed params", () => {
    const code = render(
      <ArrowFunctionExpression
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="T<A, B>">b</Identifier>,
          <Identifier
            typeAnnotation={
              <TypeAnnotation>
                <TypeReference name="T">
                  <TypeParameterInstantiation>
                    <TypeReference name="A" />
                    <TypeReference name="B" />
                    <TypeReference name="C" />
                  </TypeParameterInstantiation>
                </TypeReference>
              </TypeAnnotation>
            }
          >
            c
          </Identifier>,
        ]}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("(a: A, b: T<A, B>, c: T<A, B, C>) => {}");
  });

  it("renders function with all props", () => {
    const code = render(
      <ArrowFunctionExpression
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="B">b</Identifier>,
        ]}
        debug
      >
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </ArrowFunctionExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`(a: A, b: B): T<A, B> => {
  var v: T = "hello";
}`);
  });

  it("renders async ArrowFunctionExpression", () => {
    const code = render(<ArrowFunctionExpression async debug />, {
      prettier: false,
    });
    expect(code).toBe("async () => {}");
  });

  it("renders function declaration with async ArrowFunctionExpression", () => {
    const code = render(
      <Var name="fetchData">
        <ArrowFunctionExpression async debug />
      </Var>,
      { prettier: false },
    );
    expect(code).toBe("var fetchData = async () => {};");
  });
});
