/**
 * File: /src/components/enum/EnumMember/index.spec.tsx
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
import EnumMember from ".";
import EnumDeclaration from "../EnumDeclaration";

describe("<EnumMember />", () => {
  it("renders", async () => {
    const code = await render(
      <EnumMember member={{ name: "hello", value: "'world'" }} debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "typescript"],
        },
      },
    );
    expect(code).toBe("hello = 'world',");
  });

  it("renders with enum declaration", async () => {
    const code = await render(
      <EnumDeclaration id="Hello">
        <EnumMember member={{ name: "hello", value: "world" }} />
        <EnumMember member={{ name: "One", value: 1 }} />
      </EnumDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`enum Hello {
  hello = world,
  One = 1,
}`);
  });

  it("renders with only keys", async () => {
    const code = await render(<EnumMember member={{ name: "Monday" }} />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "typescript"],
      },
    });
    expect(code).toBe("Monday,");
  });
});
