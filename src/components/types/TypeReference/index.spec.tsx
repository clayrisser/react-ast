/**
 * File: /src/components/types/TypeReference/index.spec.tsx
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
import { TypeParameterInstantiation } from "../..";
import { render } from "../../../index";
import TypeAnnotation from "./index";

describe("<TypeAnnotation />", () => {
  it("renders with children", async () => {
    const code = await render(<TypeAnnotation name="T" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("T");
  });

  it("renders with nested children", async () => {
    const code = await render(
      <TypeAnnotation name="T" debug>
        <TypeParameterInstantiation>
          <TypeAnnotation name="A" debug />
          <TypeAnnotation name="B" debug />
        </TypeParameterInstantiation>
      </TypeAnnotation>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("T<A, B>");
  });

  it("renders with children as string", async () => {
    const code = await render(<TypeAnnotation name="T<A>" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("T<A>");
  });
});
