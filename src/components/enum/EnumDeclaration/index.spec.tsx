/**
 * File: /src/components/enum/EnumDeclaration/index.spec.tsx
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
import {
  render,
  EnumMember,
  StringLiteral,
  NumericLiteral,
} from "../../../index";

import EnumDeclaration from "./index";

describe("<EnumDeclaration />", () => {
  it("renders", async () => {
    const code = await render(<EnumDeclaration name="Hello" />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("enum Hello {}");
  });

  it("renders with enum declaration", async () => {
    const code = await render(
      <EnumDeclaration name="Hello">
        <EnumMember name="hello">
          <StringLiteral>world</StringLiteral>
        </EnumMember>
        <EnumMember name="One">
          <NumericLiteral>{1}</NumericLiteral>
        </EnumMember>
      </EnumDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`enum Hello {
  hello = "world",
  One = 1,
}`);
  });
});
