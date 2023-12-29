/**
 * File: /src/components/types/UnionType/index.spec.tsx
 * Project: react-ast
 * File Created: 29-12-2023 12:09:25
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
import UnionType from "./index";
import { render } from "../../../render";
import Identifier from "../../Identifier";
import IntersectionType from "../IntersectionType";
import BlockStatement from "../../BlockStatement";
import PropertySignature from "../../interfaces/PropertySignature";
import TypeAnnotation from "../TypeAnnotation";

describe("<UnionType />", () => {
  it("should render basic union type", async () => {
    const code = await render(
      <UnionType>
        <Identifier>A</Identifier>
        <Identifier>B</Identifier>
      </UnionType>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`A | B`);
  });

  it("it should render with Intersection", async () => {
    const code = await render(
      <UnionType debug>
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
        <Identifier>A</Identifier>
        <Identifier>B</Identifier>
        <IntersectionType>
          <Identifier>C</Identifier>
          <Identifier>D</Identifier>
        </IntersectionType>
      </UnionType>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`{
  hello: string;
  hi: string;
} | A | B | (C & D)`);
  });
});
