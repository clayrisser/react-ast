/**
 * File: /src/components/expressions/ObjectExpression/index.spec.tsx
 * Project: react-ast
 * File Created: 13-12-2023 09:57:54
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
import { StringLiteral, render } from "../../../index";
import ObjectExpression from "./index";
import Property from "../Property";

describe("<ObjectExpression />", () => {
  it("render ObjectExpression", async () => {
    const code = await render(<ObjectExpression debug={true} />, {
      prettier: false,
    });
    expect(code).toBe(`{}`);
  });

  it("render ObjectExpression with property", async () => {
    const code = await render(
      <ObjectExpression>
        <Property name="a">
          <StringLiteral>Hello</StringLiteral>
        </Property>
      </ObjectExpression>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`{
  a: "Hello"
}`);
  });

  it("render ObjectExpression with properties", async () => {
    const code = await render(
      <ObjectExpression>
        <Property key="1" name="a">
          <StringLiteral>Hello</StringLiteral>
        </Property>
        <Property key="2" name="b">
          <StringLiteral>Ok</StringLiteral>
        </Property>
      </ObjectExpression>,
      {
        prettier: false,
      },
    );
    console.log("code ", code);
    expect(code).toBe(`{
  a: "Hello",
  b: "Ok"
}`);
  });
});
