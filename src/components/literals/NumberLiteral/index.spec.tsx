/**
 * File: /src/components/literals/NumberLiteral/index.spec.tsx
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
import { render, NumberLiteral, CallExpression, Var } from "../../../index";

describe("<NumberLiteral />", () => {
  it("render number literal", () => {
    const code = render(<NumberLiteral>{1}</NumberLiteral>, {
      prettier: false,
    });
    expect(code).toBe("1");
  });

  it("renders number literal inside function argument", () => {
    const code = render(
      <CallExpression
        name="fn"
        arguments={<NumberLiteral>{1}</NumberLiteral>}
      />,
      { prettier: false },
    );
    expect(code).toBe("fn(1)");
  });

  it("renders a code and using number literal", () => {
    const code = render(
      <Var name="age">
        <NumberLiteral>{25}</NumberLiteral>
      </Var>,
      { prettier: false },
    );
    expect(code).toBe("var age = 25;");
  });
});
