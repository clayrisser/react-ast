/**
 * File: /src/components/types/TypeAliasDeclaration/index.spec.tsx
 * Project: react-ast
 * File Created: 19-12-2023 12:44:43
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
import TypeAliasDeclaration from "./index";
import { render } from "../../../render";
import BlockStatement from "../../BlockStatement";
import Identifier from "../../Identifier";
import { PropertySignature } from "../../interfaces";
import TypeAnnotation from "../TypeAnnotation";

describe("<TypeAliasDeclaration />", () => {
  it("renders correctly", async () => {
    const code = await render(<TypeAliasDeclaration name="Box" />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "typescript"],
      },
    });
    expect(code).toBe("type Box = {};");
  });

  it("renders with children", async () => {
    const code = await render(
      <TypeAliasDeclaration name="Box">
        <BlockStatement>
          <PropertySignature
            key={0}
            name="hello"
            typeAnnotation={<TypeAnnotation>string</TypeAnnotation>}
          />
          <PropertySignature
            key={1}
            name="hi"
            typeAnnotation={<TypeAnnotation>string</TypeAnnotation>}
          />
        </BlockStatement>
      </TypeAliasDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "typescript"],
        },
      },
    );
    console.log(code);
    expect(code).toBe(`type Box = {
  hello: string;
  hi: string;
};`);
  });

  it("renders type for single line", async () => {
    const code = await render(
      <TypeAliasDeclaration name="Box">
        <Identifier>string</Identifier>
      </TypeAliasDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "typescript"],
        },
      },
    );
    expect(code).toBe(`type Box = string;`);
  });

  // it("renders typeAliasDeclaration with children", async () => {
  //   const code = await render(
  //     <TypeAliasDeclaration debug name="Box">
  //       {/* <MemberExpression name="[Box]"> */}
  //       <MemberExpression name="IntrinsicElements">
  //         <Identifier>JSX</Identifier>
  //       </MemberExpression>
  //       {/* </MemberExpression> */}
  //     </TypeAliasDeclaration>,
  //     {
  //       prettier: false,
  //       parserOptions: {
  //         plugins: ["jsx", "typescript"],
  //       },
  //     },
  //   );
  //   expect(code).toBe("type Box = JSX.IntrinsicElements['Box'];");
  // });
});
