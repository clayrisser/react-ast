/**
 * File: /src/components/literals/BigIntLiteral/index.spec.tsx
 * Project: react-ast
 * File Created: 15-12-2023 10:50:27
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
import BigIntLiteral from "./index";
import { render } from "../../../index";

describe("<BigIntLiteral />", () => {
  it("renders bigint literal", async () => {
    const code = await render(
      <BigIntLiteral>{BigInt(9007199254740991)}</BigIntLiteral>,
      {
        prettier: false,
      },
    );
    console.log(typeof code);
    expect(code).toBe("9007199254740991n");
  });
});
