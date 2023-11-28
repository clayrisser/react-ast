/**
 * File: /src/components/expressions/AssignmentExpression/index.spec.tsx
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
import { render } from "../../../render";
import AssignmentExpression from "./index";
import {
  ArrowFunctionExpression,
  Identifier,
  MemberExpression,
} from "../../../components";

describe("<AssignmentExpression />", () => {
  it("renders with no children", async () => {
    const code = await render(<AssignmentExpression left="v" debug />, {
      prettier: false,
    });
    expect(code).toBe("v = undefined");
  });

  it("renders with left as component", async () => {
    const code = await render(
      <AssignmentExpression
        left={
          <MemberExpression name="howdy" debug>
            <MemberExpression name="world">
              <Identifier>hello</Identifier>
            </MemberExpression>
          </MemberExpression>
        }
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello.world.howdy = undefined");
  });

  it("renders with initial value as string", async () => {
    const code = await render(
      <AssignmentExpression left="v" debug>
        hello
      </AssignmentExpression>,
      {
        prettier: false,
      },
    );
    expect(code).toBe('v = "hello"');
  });

  it("renders with initial value as boolean", async () => {
    const code = await render(
      <AssignmentExpression left="v" debug>
        {true}
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v = true");
  });

  it("renders with initial value as number", async () => {
    const code = await render(
      <AssignmentExpression left="v" debug>
        {0}
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v = 0");
  });

  it("renders with initial value as object", async () => {
    const code = await render(
      <AssignmentExpression left="v" debug>
        {{ hello: "world" }}
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`v = {
  "hello": "world"
}`);
  });

  it("renders with initial value as component", async () => {
    const code = await render(
      <AssignmentExpression left="v" debug>
        <ArrowFunctionExpression />
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("v = () => {}");
  });
});
