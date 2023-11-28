/**
 * File: /src/components/expressions/ExpressionStatement/index.spec.tsx
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
import { CallExpression } from "../../../components";
import { render } from "../../../index";
import ExpressionStatement from "./index";

describe("<ExpressionStatement />", () => {
  it("renders expression statement", () => {
    const code = render(<ExpressionStatement debug />, {
      prettier: false,
    });
    expect(code).toBe(";");
  });

  it("renders expression statement with children", () => {
    const code = render(
      <ExpressionStatement debug>
        <CallExpression name="hello" />
      </ExpressionStatement>,
      {
        prettier: false,
      }
    );
    expect(code).toBe("hello();");
  });
});
