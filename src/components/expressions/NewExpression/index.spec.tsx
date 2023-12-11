/**
 * File: /src/components/expressions/NewExpression/index.spec.tsx
 * Project: react-ast
 * File Created: 11-12-2023 11:01:39
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

import NewExpression from "./index";
import React from "react";
import { Identifier, MemberExpression, render } from "../../../index";

describe("<NewExpression />", () => {
  it("renders new expression", async () => {
    const code = await render(<NewExpression name="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("new hello()");
  });

  it("renders new expression with children", async () => {
    const code = await render(
      <NewExpression name="world" debug>
        <MemberExpression name="hello">
          <Identifier>howdy</Identifier>
        </MemberExpression>
      </NewExpression>,
      {
        prettier: false,
      },
    );
    expect(code).toBe("new howdy.hello.world()");
  });

  it("renders new expression with argument", async () => {
    const code = await render(
      <NewExpression
        name="hello"
        arguments={[<Identifier key="0">a</Identifier>]}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("new hello(a)");
  });
});
