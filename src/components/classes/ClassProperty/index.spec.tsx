/**
 * File: /src/components/classes/ClassProperty/index.spec.tsx
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
import {
  TypeAnnotation,
  TypeReference,
  TypeParameterInstantiation,
} from "../../../components";
import ClassProperty, { ClassPropertyAccessibility } from "./index";

describe("<ClassProperty />", () => {
  it("renders", () => {
    const code = render(<ClassProperty id="p" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("p;");
  });

  it("renders with static", () => {
    const code = render(<ClassProperty static id="p" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("static p;");
  });

  it("renders with accessibility", () => {
    const code = render(
      <ClassProperty
        id="p"
        accessibility={ClassPropertyAccessibility.Private}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("private p;");
  });

  it("renders with static accessibility", () => {
    const code = render(
      <ClassProperty
        accessibility={ClassPropertyAccessibility.Private}
        static
        id="p"
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("private static p;");
  });

  it("renders with type annotation", () => {
    const code = render(
      <ClassProperty
        id="p"
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
    expect(code).toBe("p: T;");
  });

  it("renders with nested type annotation", () => {
    const code = render(
      <ClassProperty
        id="p"
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
    expect(code).toBe("p: T<A, B>;");
  });

  it("renders with annotation as string", () => {
    const code = render(<ClassProperty id="p" typeAnnotation="T<A>" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("p: T<A>;");
  });

  it("renders with initial value as string", () => {
    const code = render(
      <ClassProperty id="p" typeAnnotation="T<A>" debug>
        hello
      </ClassProperty>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('p: T<A> = "hello";');
  });

  it("renders with initial value as boolean", () => {
    const code = render(
      <ClassProperty id="p" typeAnnotation="T<A>" debug>
        {true}
      </ClassProperty>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("p: T<A> = true;");
  });

  it("renders with initial value as number", () => {
    const code = render(
      <ClassProperty id="p" typeAnnotation="T<A>" debug>
        {0}
      </ClassProperty>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("p: T<A> = 0;");
  });

  it("renders with initial value as object", () => {
    const code = render(
      <ClassProperty id="p" typeAnnotation="T<A>" debug>
        {{ hello: "world" }}
      </ClassProperty>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`p: T<A> = {
  "hello": "world"
};`);
  });
});
