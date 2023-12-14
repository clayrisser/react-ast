/**
 * File: /src/components/expressions/ArrayExpression/index.spec.tsx
 * Project: react-ast
 * File Created: 14-12-2023 12:28:18
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
import ArrayExpression from ".";
import { render } from "../../../render";
import { BooleanLiteral, NumericLiteral, StringLiteral } from "../../literals";

describe("<ArrayExpression />", () => {
  it("renders an ArrayExpression", async () => {
    const code = await render(
      <ArrayExpression>
        <StringLiteral key={0}>Hello</StringLiteral>
        <BooleanLiteral key={1}>{true}</BooleanLiteral>
        <NumericLiteral key={2}>{6}</NumericLiteral>
      </ArrayExpression>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`["Hello", true, 6]`);
  });
});
