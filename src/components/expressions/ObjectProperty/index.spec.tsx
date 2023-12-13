/**
 * File: /src/components/expressions/ObjectProperty/index.spec.tsx
 * Project: react-ast
 * File Created: 13-12-2023 10:20:12
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
import ObjectProperty from "./index";
import { render } from "../../../index";
import StringLiteral from "../../literals/StringLiteral";

describe("<ObjectProperty />", () => {
  it("render ObjectProperty", async () => {
    const code = await render(
      <ObjectProperty name="a" debug={true}>
        <StringLiteral>Hello</StringLiteral>
      </ObjectProperty>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`a: "Hello"`);
  });

  it("render ObjectProperty without value", async () => {
    const code = await render(<ObjectProperty name="a" debug={true} />, {
      prettier: false,
    });
    expect(code).toBe(`a`);
  });
});
