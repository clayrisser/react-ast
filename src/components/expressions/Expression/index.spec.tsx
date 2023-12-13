/**
 * File: /src/components/expressions/Expression/index.spec.tsx
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
import { Identifier, ArrowFunctionExpression } from "../../../components";
import { render } from "../../../index";
import Expression from "./index";

describe("<Expression />", () => {
  it("renders expression with properties", async () => {
    const code = await render(
      <Expression identifiers={["hello", "world", "howdy"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello.world.howdy");
  });

  it("renders expression with properties as string", async () => {
    const code = await render(
      <Expression identifiers="howdy.hello.world" debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("howdy.hello.world");
  });

  it("renders expression with property as string", async () => {
    const code = await render(<Expression identifiers="howdy" debug />, {
      prettier: false,
    });
    expect(code).toBe("howdy");
  });

  it("renders called expression with property as string", async () => {
    const code = await render(<Expression identifiers="hello" call debug />, {
      prettier: false,
    });
    expect(code).toBe("hello()");
  });

  it("renders called expression with properties", async () => {
    const code = await render(
      <Expression identifiers={["hello", "world"]} call debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello.world()");
  });

  it("renders called expression with properties as string", async () => {
    const code = await render(
      <Expression identifiers="howdy.texas" call debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("howdy.texas()");
  });

  it("renders called expression with properties and argument", async () => {
    const code = await render(
      <Expression
        identifiers="hello.world"
        arguments={<Identifier>a</Identifier>}
        call
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello.world(a)");
  });

  it("renders called expression with properties and arguments", async () => {
    const code = await render(
      <Expression
        identifiers={["hello", "world"]}
        arguments={[
          <Identifier key={0}>a</Identifier>,
          <ArrowFunctionExpression key={1} />,
        ]}
        call
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello.world(a, () => {})");
  });

  it("renders called expression with properties and argument as string", async () => {
    const code = await render(
      <Expression identifiers="howdy.texas" arguments="a" call debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("howdy.texas(a)");
  });

  it("renders called expression with properties and arguments as string", async () => {
    const code = await render(
      <Expression
        identifiers={["howdy", "texas"]}
        arguments={["a", "b", "c"]}
        call
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("howdy.texas(a, b, c)");
  });

  it("renders assigning no children", async () => {
    const code = await render(<Expression identifiers="a.b.c" debug />, {
      prettier: false,
    });
    expect(code).toBe("a.b.c");
  });

  it("renders assigning initial value as string", async () => {
    const code = await render(
      <Expression identifiers="a.b.c" debug>
        hello
      </Expression>,
      {
        prettier: false,
      },
    );
    expect(code).toBe('a.b.c = "hello"');
  });

  it("renders assigning initial value as boolean", async () => {
    const code = await render(
      <Expression identifiers="a.b.c" debug>
        {true}
      </Expression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("a.b.c = true");
  });

  it("renders assigning initial value as number", async () => {
    const code = await render(
      <Expression identifiers="a.b.c" debug>
        {0}
      </Expression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("a.b.c = 0");
  });

  it("renders assigning initial value as object", async () => {
    const code = await render(
      <Expression identifiers="a.b.c" debug>
        {{ hello: "world" }}
      </Expression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`a.b.c = {
  "hello": "world"
}`);
  });

  it("renders assigning initial value as component", async () => {
    const code = await render(
      <Expression identifiers="a.b.c" debug>
        <ArrowFunctionExpression />
      </Expression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("a.b.c = () => {}");
  });
});
