/**
 * File: /src/components/interfaces/InterfaceDeclaration/index.spec.tsx
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
  ExpressionWithTypeArguments,
  Identifier,
  InterfaceTypeReference,
  MethodSignature,
  PropertySignature,
  TypeParameterInstantiation,
  TypeReference,
} from "../../../components";
import InterfaceDeclaration from "./index";

describe("<InterfaceDeclaration />", () => {
  it("renders", async () => {
    const code = await render(<InterfaceDeclaration name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("interface Hello {}");
  });

  it("renders", async () => {
    const code = await render(
      <InterfaceDeclaration
        extends={[
          <Identifier key={0}>Hello</Identifier>,
          <Identifier key={1}>Ok</Identifier>,
        ]}
        name="Hello"
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("interface Hello extends Hello, Ok {}");
  });

  it("renders with type parameters", async () => {
    const code = await render(
      <InterfaceDeclaration
        name="Hello"
        typeParameters={["A", <TypeReference key="B" name="B" />]}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("interface Hello<A, B> {}");
  });

  it("renders with type parameters as string", async () => {
    const code = await render(
      <InterfaceDeclaration name="Hello" typeParameters="T" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("interface Hello<T> {}");
  });

  it("renders with type arguments", async () => {
    const code = await render(
      <InterfaceDeclaration
        name="A"
        extends={[
          <ExpressionWithTypeArguments key={0} name="B">
            <InterfaceTypeReference>C</InterfaceTypeReference>
            <InterfaceTypeReference>D</InterfaceTypeReference>
          </ExpressionWithTypeArguments>,
          <Identifier key={2}>E</Identifier>,
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
    expect(code).toBe("interface A extends B<C, D>, E {}");
  });

  it("renders with nested type parameters", async () => {
    const code = await render(
      <InterfaceDeclaration
        name="Hello"
        typeParameters={
          <TypeReference name="T">
            <TypeParameterInstantiation>
              <TypeReference name="A" />
              <TypeReference name="B" />
            </TypeParameterInstantiation>
          </TypeReference>
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
    expect(code).toBe("interface Hello<T<A, B>> {}");
  });

  it("renders with interface property signatures", async () => {
    const code = await render(
      <InterfaceDeclaration name="Hello" debug>
        <PropertySignature name="hello" typeAnnotation="T" />
      </InterfaceDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`interface Hello {
  hello: T;
}`);
  });

  it("renders with interface method signatures", async () => {
    const code = await render(
      <InterfaceDeclaration name="Hello" debug>
        <MethodSignature name="hello" returnType="T" />
      </InterfaceDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`interface Hello {
  hello(): T;
}`);
  });

  it("renders with interface method and property signatures", async () => {
    const code = await render(
      <InterfaceDeclaration name="Hello" debug>
        <PropertySignature name="hello" typeAnnotation="T" />
        <MethodSignature name="hello" returnType="T" />
      </InterfaceDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`interface Hello {
  hello: T;
  hello(): T;
}`);
  });
});
