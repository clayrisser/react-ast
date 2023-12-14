/**
 * File: /src/components/literals/ArrayLiteral/index.spec.tsx
 * Project: react-ast
 * File Created: 14-12-2023 10:22:22
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
import ArrayLiteral from ".";
import { render } from "../../../render";

describe("<ArrayLiteral />", () => {
  it("renders a ArrayLiteral", async () => {
    const arr = ["Hello", 24];
    const code = await render(
      <ArrayLiteral>{JSON.stringify(arr)}</ArrayLiteral>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`["Hello", 24]`);
  });
  it("renders  Array of array and objects", async () => {
    const arr = ["Hello", 24, ["ok", true, { one: 1 }]];
    const code = await render(
      <ArrayLiteral>{JSON.stringify(arr)}</ArrayLiteral>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`["Hello", 24, ["ok", true, {
  "one": 1
}]]`);
  });
});
