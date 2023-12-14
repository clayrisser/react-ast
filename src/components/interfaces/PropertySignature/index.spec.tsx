/**
 * File: /src/components/interfaces/PropertySignature/index.spec.tsx
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
  TypeAnnotation,
  TypeReference,
  TypeParameterInstantiation,
} from "../../../components";
import PropertySignature from "./index";

describe("<PropertySignature />", () => {
  it("renders", async () => {
    const code = await render(<PropertySignature name="p" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("p;");
  });

  it("renders with type annotation", async () => {
    const code = await render(
      <PropertySignature
        name="p"
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

  it("renders with nested type annotation", async () => {
    const code = await render(
      <PropertySignature
        name="p"
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

  it("renders with annotation as string", async () => {
    const code = await render(
      <PropertySignature name="p" typeAnnotation="T<A>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("p: T<A>;");
  });
});
