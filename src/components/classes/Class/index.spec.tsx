/**
 * File: /src/components/classes/Class/index.spec.tsx
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

import Class from "./index";
import React from "react";
import { render } from "../../../index";
import {
  ClassMethod,
  ClassMethodAccessibility,
  ClassProperty,
  ClassPropertyAccessibility,
  TypeParameterInstantiation,
  TypeReference,
} from "../../../components";

describe("<Class />", () => {
  it("renders", () => {
    const code = render(<Class name="Hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("class Hello {}");
  });

  it("renders with type parameters", () => {
    const code = render(
      <Class
        name="Hello"
        typeParameters={["A", <TypeReference key={0} name="B" />]}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("class Hello<A, B> {}");
  });

  it("renders with type parameters as string", () => {
    const code = render(<Class name="Hello" typeParameters="T" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("class Hello<T> {}");
  });

  it("renders with nested type parameters", () => {
    const code = render(
      <Class
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
    expect(code).toBe("class Hello<T<A, B>> {}");
  });

  it("renders with super class", () => {
    const code = render(
      <Class
        name="Hello"
        typeParameters={
          <TypeReference name="T">
            <TypeParameterInstantiation>
              <TypeReference name="A" />
              <TypeReference name="B" />
            </TypeParameterInstantiation>
          </TypeReference>
        }
        extends="Howdy"
        extendsTypeParameters={
          <TypeReference name="A">
            <TypeParameterInstantiation>
              <TypeReference name="B" />
              <TypeReference name="C" />
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
    expect(code).toBe("class Hello<T<A, B>> extends Howdy<A<B, C>> {}");
  });

  it("renders with class properties", () => {
    const code = render(
      <Class name="Hello" debug>
        <ClassProperty
          id="hello"
          typeAnnotation="T"
          accessibility={ClassPropertyAccessibility.Protected}
        >
          world
        </ClassProperty>
      </Class>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`class Hello {
  protected hello: T = "world";
}`);
  });

  it("renders with class methods", () => {
    const code = render(
      <Class name="Hello" debug>
        <ClassMethod
          id="hello"
          returnType="T"
          accessibility={ClassMethodAccessibility.Protected}
        />
      </Class>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`class Hello {
  protected hello(): T {}
}`);
  });

  it("renders with class properties and methods", () => {
    const code = render(
      <Class name="Hello" debug>
        <ClassProperty
          id="hello"
          typeAnnotation="T"
          accessibility={ClassPropertyAccessibility.Protected}
        >
          world
        </ClassProperty>
        <ClassMethod
          id="hello"
          returnType="T"
          accessibility={ClassMethodAccessibility.Protected}
        />
      </Class>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`class Hello {
  protected hello: T = "world";

  protected hello(): T {}
}`);
  });
});
