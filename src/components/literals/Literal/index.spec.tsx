/**
 * File: /src/components/literals/Literal/index.spec.tsx
 * Project: react-ast
 * File Created: 14-12-2023 17:54:12
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
import Literal from "./index";
import { render } from "../../../index";

describe("<Literal />", () => {
  it("renders literal", async () => {
    const code = await render(<Literal>{1}</Literal>, {
      prettier: false,
    });
    expect(code).toBe("1");
  });

  it("renders string literal", async () => {
    const code = await render(<Literal>Hello</Literal>, {
      prettier: false,
    });
    console.log(code);
    expect(code).toBe('"Hello"');
  });

  it("renders boolean literal", async () => {
    const code = await render(<Literal>{true}</Literal>, {
      prettier: false,
    });
    expect(code).toBe("true");
  });

  it("renders null literal", async () => {
    const code = await render(<Literal>{null}</Literal>, {
      prettier: false,
    });
    expect(code).toBe("null");
  });

  it("renders undefined literal", async () => {
    const code = await render(<Literal>{["hello", 2, 4, true]}</Literal>, {
      prettier: false,
    });
    expect(code).toBe('["hello", 2, 4, true]');
  });

  it("renders object literal", async () => {
    const code = await render(
      <Literal>{{ a: 1, b: 2, c: true, d: "Hello World" }}</Literal>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`{
  "a": 1,
  "b": 2,
  "c": true,
  "d": "Hello World"
}`);
  });

  it("renders bigint literal", async () => {
    const code = await render(<Literal>{BigInt(9007199254740991)}</Literal>, {
      prettier: false,
    });
    expect(code).toBe("9007199254740991n");
  });
});
