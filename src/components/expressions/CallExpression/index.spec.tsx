/**
 * File: /src/components/expressions/CallExpression/index.spec.tsx
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
import {
  Identifier,
  ArrowFunctionExpression,
  MemberExpression,
} from "../../../components";
import { render } from "../../../index";
import CallExpression from "./index";

describe("<CallExpression />", () => {
  it("renders call expression", () => {
    const code = render(<CallExpression name="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("hello()");
  });

  it("renders call expression with children", () => {
    const code = render(
      <CallExpression name="world" debug>
        <MemberExpression name="hello">
          <Identifier>howdy</Identifier>
        </MemberExpression>
      </CallExpression>,
      {
        prettier: false,
      },
    );
    expect(code).toBe("howdy.hello.world()");
  });

  it("renders call expression with argument", () => {
    const code = render(
      <CallExpression
        name="hello"
        arguments={<Identifier>a</Identifier>}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello(a)");
  });

  it("renders call expression with arguments", () => {
    const code = render(
      <CallExpression
        name="hello"
        arguments={[<Identifier>a</Identifier>, <ArrowFunctionExpression />]}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello(a, () => {})");
  });

  it("renders call expression with argument as string", () => {
    const code = render(<CallExpression name="hello" arguments="a" debug />, {
      prettier: false,
    });
    expect(code).toBe("hello(a)");
  });

  it("renders call expression with arguments as string", () => {
    const code = render(
      <CallExpression name="hello" arguments={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello(a, b, c)");
  });
});
