/**
 * File: /src/components/types/IntersectionType/index.spec.tsx
 * Project: react-ast
 * File Created: 29-12-2023 15:29:00
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
import IntersectionType from "./index";
import { render } from "../../../render";
import Identifier from "../../Identifier";

describe("IntersectionType", () => {
  it("should match snapshot", async () => {
    const code = await render(
      <IntersectionType>
        <Identifier>A</Identifier>
        <Identifier>B</Identifier>
      </IntersectionType>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`A & B`);
  });
});
