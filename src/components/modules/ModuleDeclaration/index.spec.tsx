/**
 * File: /src/components/modules/ModuleDeclaration/index.spec.tsx
 * Project: react-ast
 * File Created: 18-12-2023 14:31:39
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
import ModuleDeclaration, { DeclarationType } from "./index";
import { render } from "../../../render";
import { InterfaceDeclaration, PropertySignature } from "../../interfaces";

describe("<ModuleDeclaration />", () => {
  it("render moduleDeclaration", async () => {
    const code = await render(
      <ModuleDeclaration declaration={DeclarationType.Declare} name="global">
        <ModuleDeclaration declaration={DeclarationType.Namespace} name="jsx">
          <InterfaceDeclaration name="IntrinsicElements">
            <PropertySignature name="Box" typeAnnotation="BoxProps" />
          </InterfaceDeclaration>
        </ModuleDeclaration>
      </ModuleDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );

    console.log(code);
    expect(code).toBe(
      `declare global {
  namespace jsx {
    interface IntrinsicElements {
      Box: BoxProps;
    }
  }
}`,
    );
  });

  it("render moduleDeclaration without children", async () => {
    const code = await render(
      <ModuleDeclaration declaration={DeclarationType.Declare} name="global" />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`declare global {}`);
  });
});
