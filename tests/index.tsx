/**
 * File: /tests/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 05:02:26
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
import { render, Smart } from "../src/index";

describe("render(<Jsx />)", () => {
  it("should render code", async () => {
    expect(
      render(
        <>
          <Smart code="const hello = 'world'" />
          {"const howdy = () => 'texas'"}
        </>,
      ),
    ).toBe(`const hello = "world";

const howdy = () => "texas";
`);
  });
});

export default null;
