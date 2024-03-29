/**
 * File: /src/components/functions/Return/index.spec.tsx
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
import Return from "./index";
import { Identifier } from "../../../components";
import { render } from "../../../index";

describe("<Return />", () => {
  it("renders return statement", async () => {
    const code = await render(<Return debug>{{ hello: "world" }}</Return>, {
      prettier: false,
    });
    expect(code).toBe(`return {
  "hello": "world"
};`);
  });

  it("renders return statement with children", async () => {
    const code = await render(
      <Return debug>
        <Identifier>hello</Identifier>
      </Return>,
      {
        prettier: false,
      },
    );
    expect(code).toBe("return hello;");
  });
});
