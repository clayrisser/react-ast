/**
 * File: /src/components/modules/ExportAllDeclaration/index.spec.tsx
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

import ExportAllDeclaration from "./index";
import React from "react";
import { render } from "../../../index";

describe("<ExportAllDeclaration />", () => {
  it("renders with source", async () => {
    const code = await render(<ExportAllDeclaration source="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("export * from 'world';");
  });
});
