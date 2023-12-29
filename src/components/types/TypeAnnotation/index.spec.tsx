/**
 * File: /src/components/types/TypeAnnotation/index.spec.tsx
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
  render,
  TypeReference,
  TypeParameterInstantiation,
} from "../../../index";
import TypeAnnotation from "./index";

describe("<TypeAnnotation />", () => {
  it("renders with children", async () => {
    const code = await render(
      <TypeAnnotation debug>
        <TypeReference name="T" />
      </TypeAnnotation>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(": T");
  });

  // h:[string,string,string]

  it("renders with nested children", async () => {
    const code = await render(
      <TypeAnnotation debug>
        <TypeReference name="T">
          <TypeParameterInstantiation>
            <TypeReference name="A" />
            <TypeReference name="B" />
          </TypeParameterInstantiation>
        </TypeReference>
      </TypeAnnotation>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(": T<A, B>");
  });

  it("renders with children as string", async () => {
    const code = await render(<TypeAnnotation debug>T</TypeAnnotation>, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe(": T");
  });
});
