/**
 * File: /src/components/modules/Import/index.spec.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:05:44
 * Author: Lalit rajak
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
import { render } from "../../../index";
import { ImportSpecifier } from "../..";
import Import from "./index";

describe("<Import />", () => {
  it("renders with default specifier", async () => {
    const code = await render(<Import default="hello" from="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("import hello from 'world';");
  });

  it("renders with namespace specifier", async () => {
    const code = await render(<Import namespace="hello" from="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("import * as hello from 'world';");
  });

  it("renders with namespace specifier override", async () => {
    const code = await render(
      <Import
        namespace="hello"
        default="hello"
        imports="hello"
        from="world"
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import * as hello from 'world';");
  });

  it("renders with specifier", async () => {
    const code = await render(<Import imports="hello" from="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("import { hello } from 'world';");
  });

  it("renders with imports", async () => {
    const code = await render(
      <Import
        imports={[
          <ImportSpecifier>hello</ImportSpecifier>,
          <ImportSpecifier>howdy</ImportSpecifier>,
        ]}
        from="world"
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import { hello, howdy } from 'world';");
  });

  it("renders with imports as string", async () => {
    const code = await render(
      <Import imports={["hello", "howdy"]} from="world" debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import { hello, howdy } from 'world';");
  });

  it("renders with imports and default specifier", async () => {
    const code = await render(
      <Import
        default="hello"
        imports={[<ImportSpecifier>howdy</ImportSpecifier>]}
        from="world"
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import hello, { howdy } from 'world';");
  });
});
