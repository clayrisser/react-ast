/**
 * File: /src/components/modules/ExportNamedDeclaration/index.spec.tsx
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
import {
  ExportSpecifier,
  VariableDeclaration,
  VariableDeclarator,
  ArrowFunctionExpression,
} from "../..";
import { render } from "../../../index";
import ExportNamedDeclaration from "./index";

describe("<ExportNamedDeclaration />", () => {
  it("renders empty named declaration", () => {
    const code = render(<ExportNamedDeclaration debug />, {
      prettier: false,
    });
    expect(code).toBe("export {};");
  });

  it("renders with specifier", () => {
    const code = render(
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

  it("renders with specifiers", () => {
    const code = render(
      <ExportNamedDeclaration
        specifiers={[
          <ExportSpecifier>hello</ExportSpecifier>,
          <ExportSpecifier>world</ExportSpecifier>,
        ]}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export { hello, world };");
  });

  it("renders with specifier as string", () => {
    const code = render(<ExportNamedDeclaration specifiers="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("export { hello };");
  });

  it("renders with specifiers as string", () => {
    const code = render(
      <ExportNamedDeclaration specifiers={["hello", "world"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export { hello, world };");
  });

  it("renders with specifiers and source", () => {
    const code = render(
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

  it("renders with source", () => {
    const code = render(<ExportNamedDeclaration source="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("export {} from 'world';");
  });

  it("renders with children", () => {
    const code = render(
      <ExportNamedDeclaration debug>
        <VariableDeclaration>
          <VariableDeclarator id="hello">
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
});
