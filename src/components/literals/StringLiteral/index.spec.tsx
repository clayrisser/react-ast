/**
 * File: /src/components/literals/StringLiteral/index.spec.tsx
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
import { CallExpression, StringLiteral, Var, render } from "../../../index";

describe("<StringLiteral />", () => {
  it("renders string", async () => {
    const code = await render(<StringLiteral debug>HI</StringLiteral>, {
      prettier: false,
    });
    expect(code).toBe('"HI"');
  });

  it("renders string inside function argument", async () => {
    const code = await render(
      <CallExpression
        name="fn"
        arguments={<StringLiteral>Hi</StringLiteral>}
      />,
      { prettier: false },
    );
    expect(code).toBe('fn("Hi")');
  });

  it("renders code as a string", async () => {
    const code = await render(
      <Var name="a">
        <StringLiteral>a</StringLiteral>
      </Var>,
      {
        prettier: false,
      },
    );
    expect(code).toBe('var a = "a";');
  });
});
