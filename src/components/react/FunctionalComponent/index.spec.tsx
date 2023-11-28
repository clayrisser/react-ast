/**
 * File: /src/components/react/FunctionalComponent/index.spec.tsx
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
import { Jsx } from "../..";
import { render } from "../../../index";
import FunctionalComponent from "./index";

describe("<FunctionalComponent />", () => {
  it("renders functional component", async () => {
    const code = await render(<FunctionalComponent name="Hello" />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe(`import React, { FC } from 'react';
export interface HelloProps {}
const Hello: FC<HelloProps> = (props: HelloProps) => {
  return <></>;
};
Hello.defaultProps = {}
export default Hello;`);
  });

  it("renders functional component with children", async () => {
    const code = await render(
      <FunctionalComponent name="Hello">
        <Jsx>
          <Jsx name="Hello" />
        </Jsx>
      </FunctionalComponent>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`import React, { FC } from 'react';
export interface HelloProps {}
const Hello: FC<HelloProps> = (props: HelloProps) => {
  return <><Hello /></>;
};
Hello.defaultProps = {}
export default Hello;`);
  });
});
