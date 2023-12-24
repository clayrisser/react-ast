/**
 * File: /src/components/expressions/Property/index.spec.tsx
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
import Property from "./index";
import { render } from "../../../index";
import StringLiteral from "../../literals/StringLiteral";

describe("<Property />", () => {
  it("render Property", async () => {
    const code = await render(
      <Property name="a" debug={true}>
        <StringLiteral>Hello</StringLiteral>
      </Property>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`a: "Hello"`);
  });

  it("render Property without value", async () => {
    const code = await render(<Property name="a" debug={true} />, {
      prettier: false,
    });
    expect(code).toBe(`a`);
  });
});
