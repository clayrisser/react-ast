/**
 * File: /src/components/interfaces/MethodSignature/index.spec.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:04:04
 * Author: dharmendra
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
  Identifier,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
} from "../../../components";
import MethodSignature from "./index";

describe("<MethodSignature />", () => {
  it("renders empty method signature", async () => {
    const code = await render(<MethodSignature name="hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("hello();");
  });

  it("renders with nested return type", async () => {
    const code = await render(
      <MethodSignature
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
    expect(code).toBe("hello(): T<A, B>;");
  });

  it("renders with return type as string", async () => {
    const code = await render(
      <MethodSignature name="hello" returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("hello(): T<A, B, C>;");
  });

  it("renders with params as string", async () => {
    const code = await render(
      <MethodSignature name="hello" params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello(a, b, c);");
  });

  it("renders with typed params", async () => {
    const code = await render(
      <MethodSignature
        name="hello"
        params={[
          <Identifier key={0} typeAnnotation="A">
            a
          </Identifier>,
          <Identifier key={1} typeAnnotation="T<A, B>">
            b
          </Identifier>,
          <Identifier
            key={2}
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
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("hello(a: A, b: T<A, B>, c: T<A, B, C>);");
  });

  it("renders with all props", async () => {
    const code = await render(
      <MethodSignature
        returnType="T<A, B>"
        params={[
          <Identifier key={0} typeAnnotation="A">
            a
          </Identifier>,
          <Identifier key={1} typeAnnotation="B">
            b
          </Identifier>,
        ]}
        name="hello"
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("hello(a: A, b: B): T<A, B>;");
  });
});
