/**
 * File: /src/components/modules/ExportNamedDeclaration/index.spec.tsx
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
import { render } from "../../../index";
import ExportNamedDeclaration from "./index";
import {
  ExportSpecifier,
  VariableDeclaration,
  VariableDeclarator,
  ArrowFunctionExpression,
} from "../../../components";

describe("<ExportNamedDeclaration />", () => {
  it("renders empty named declaration", async () => {
    const code = await render(<ExportNamedDeclaration debug />, {
      prettier: false,
    });
    expect(code).toBe("export {};");
  });

  it("renders with specifier", async () => {
    const code = await render(
      <ExportNamedDeclaration
        specifiers={<ExportSpecifier>hello</ExportSpecifier>}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export { hello };");
  });

  it("renders with specifiers", async () => {
    const code = await render(
      <ExportNamedDeclaration
        specifiers={[
          <ExportSpecifier key="hello">hello</ExportSpecifier>,
          <ExportSpecifier key="world">world</ExportSpecifier>,
        ]}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export { hello, world };");
  });

  it("renders with specifier as string", async () => {
    const code = await render(
      <ExportNamedDeclaration specifiers="hello" debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export { hello };");
  });

  it("renders with specifiers as string", async () => {
    const code = await render(
      <ExportNamedDeclaration specifiers={["hello", "world"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export { hello, world };");
  });

  it("renders with specifiers and source", async () => {
    const code = await render(
      <ExportNamedDeclaration
        specifiers={["hello", "world"]}
        source="./world"
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export { hello, world } from './world';");
  });

  it("renders with source", async () => {
    const code = await render(<ExportNamedDeclaration source="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("export {} from 'world';");
  });

  it("renders with children", async () => {
    const code = await render(
      <ExportNamedDeclaration debug>
        <VariableDeclaration>
          <VariableDeclarator name="hello">
            <ArrowFunctionExpression />
          </VariableDeclarator>
        </VariableDeclaration>
      </ExportNamedDeclaration>,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export var hello = () => {};");
  });

  it("renders the export kind type", async () => {
    const code = await render(
      <ExportNamedDeclaration
        exportKind="type"
        specifiers={[
          <ExportSpecifier key="hello">hello</ExportSpecifier>,
          <ExportSpecifier key="ok">ok</ExportSpecifier>,
        ]}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export type { hello, ok };");
  });
});
