/**
 * File: /src/components/types/TypeParameterDeclaration/index.spec.tsx
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
import { TypeReference } from "../..";
import { render } from "../../../index";
import TypeParameterDeclaration from "./index";

describe("<TypeParameterDeclaration />", () => {
  it("renders with children ", () => {
    const code = render(
      <TypeParameterDeclaration debug>
        <TypeReference name="A" />
        <TypeReference name="B" />
      </TypeParameterDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<A, B>");
  });

  it("renders with children as string", () => {
    const code = render(
      <TypeParameterDeclaration debug>T</TypeParameterDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<T>");
  });
});
