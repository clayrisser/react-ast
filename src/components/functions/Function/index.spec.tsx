/**
 * File: /src/components/functions/Function/index.spec.tsx
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
import Function from "./index";
import {
  Identifier,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
  VariableDeclaration,
  VariableDeclarator,
} from "../../../components";

describe("<Function />", () => {
  it("renders empty function", async () => {
    const code = await render(<Function name="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("function hello() {}");
  });

  it("renders anonymous function", async () => {
    const code = await render(<Function debug />, {
      prettier: false,
    });
    expect(code).toBe("function () {}");
  });

  it("renders function with nested return type", async () => {
    const code = await render(
      <Function
        name="hello"
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
      <Function name="hello" returnType="T<A, B, C>" debug />,
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
      <Function name="hello" debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            name="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </Function>,
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
      <Function name="hello" params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("function hello(a, b, c) {}");
  });

  it("renders function with children as string", async () => {
    const code = await render(
      <Function name="hello" debug>
        const hello = 0;
      </Function>,
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
      <Function
        name="hello"
        params={[
          <Identifier key="a" typeAnnotation="A">
            a
          </Identifier>,
          <Identifier key="b" typeAnnotation="T<A, B>">
            b
          </Identifier>,
          <Identifier
            key="c"
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
      <Function
        returnType="T<A, B>"
        params={[
          <Identifier key="a" typeAnnotation="A">
            a
          </Identifier>,
          <Identifier key="b" typeAnnotation="B">
            b
          </Identifier>,
        ]}
        name="hello"
        debug
      >
        <VariableDeclaration debug>
          <VariableDeclarator
            name="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </Function>,
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

  it("renders empty arrow function", async () => {
    const code = await render(<Function arrow debug />, {
      prettier: false,
    });
    expect(code).toBe("() => {}");
  });

  it("renders arrow function with nested return type", async () => {
    const code = await render(
      <Function
        arrow
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

  it("renders arrow function with return type as string", async () => {
    const code = await render(
      <Function arrow returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("(): T<A, B, C> => {}");
  });

  it("renders arrow function with nested children", async () => {
    const code = await render(
      <Function arrow debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            name="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </Function>,
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

  it("renders arrow function with params as string", async () => {
    const code = await render(
      <Function arrow params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("(a, b, c) => {}");
  });

  it("renders arrow function with children as string", async () => {
    const code = await render(
      <Function arrow debug>
        const hello = 0;
      </Function>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`() => {
  const hello = 0;
}`);
  });

  it("renders arrow function with typed params", async () => {
    const code = await render(
      <Function
        arrow
        params={[
          <Identifier key="a" typeAnnotation="A">
            a
          </Identifier>,
          <Identifier key="b" typeAnnotation="T<A, B>">
            b
          </Identifier>,
          <Identifier
            key="c"
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

  it("renders arrow function with all props", async () => {
    const code = await render(
      <Function
        arrow
        returnType="T<A, B>"
        params={[
          <Identifier key="a" typeAnnotation="A">
            a
          </Identifier>,
          <Identifier key="b" typeAnnotation="B">
            b
          </Identifier>,
        ]}
        debug
      >
        <VariableDeclaration debug>
          <VariableDeclarator
            name="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </Function>,
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
});
