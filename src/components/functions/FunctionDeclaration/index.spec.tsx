/**
 * File: /src/components/functions/FunctionDeclaration/index.spec.tsx
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

import FunctionDeclaration from "./index";
import React from "react";
import { render } from "../../../index";
import {
  Identifier,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
  VariableDeclaration,
  VariableDeclarator,
} from "../../../components";

describe("<FunctionDeclaration />", () => {
  it("renders empty function", async () => {
    const code = await render(<FunctionDeclaration id="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("function hello() {}");
  });

  it("renders anonymous function", async () => {
    const code = await render(<FunctionDeclaration debug />, {
      prettier: false,
    });
    expect(code).toBe("function () {}");
  });

  it("renders function with nested return type", async () => {
    const code = await render(
      <FunctionDeclaration
        id="hello"
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
    expect(code).toBe("function hello(): T<A, B> {}");
  });

  it("renders function with return type as string", async () => {
    const code = await render(
      <FunctionDeclaration id="hello" returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("function hello(): T<A, B, C> {}");
  });

  it("renders function with nested children", async () => {
    const code = await render(
      <FunctionDeclaration id="hello" debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </FunctionDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`function hello() {
  var v: T = "hello";
}`);
  });

  it("renders function with params as string", async () => {
    const code = await render(
      <FunctionDeclaration id="hello" params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("function hello(a, b, c) {}");
  });

  it("renders function with children as string", async () => {
    const code = await render(
      <FunctionDeclaration id="hello" debug>
        const hello = 0;
      </FunctionDeclaration>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`function hello() {
  const hello = 0;
}`);
  });

  it("renders function with typed params", async () => {
    const code = await render(
      <FunctionDeclaration
        id="hello"
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
    expect(code).toBe("function hello(a: A, b: T<A, B>, c: T<A, B, C>) {}");
  });

  it("renders function with all props", async () => {
    const code = await render(
      <FunctionDeclaration
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="B">b</Identifier>,
        ]}
        id="hello"
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
      </FunctionDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`function hello(a: A, b: B): T<A, B> {
  var v: T = "hello";
}`);
  });

  it("renders async function", async () => {
    const code = await render(<FunctionDeclaration id="hello" async debug />, {
      prettier: false,
    });

    expect(code).toBe("async function hello() {}");
  });
});
