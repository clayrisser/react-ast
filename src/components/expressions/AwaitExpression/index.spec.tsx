/**
 * File: /src/components/expressions/AwaitExpression/index.spec.tsx
 * Project: react-ast
 * File Created: 08-12-2023 12:34:57
 * Author: K S R PHANI BHUSHAN
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

/**
 * File: /src/components/expressions/AwaitExpression/index.spec.tsx
 * Project: react-ast
 * File Created: 08-12-2023 12:07:34
 * Author: K S R PHANI BHUSHAN
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
import FunctionDeclaration from "../../../components/functions/FunctionDeclaration";
import VariableDeclaration, {
  VariableDeclarationKind,
} from "../../../components/variables/VariableDeclaration";
import VariableDeclarator from "../../../components/variables/VariableDeclarator";
import AwaitExpression from "../../../components/expressions/AwaitExpression";
import Identifier from "../../../components/Identifier";

describe("FunctionDeclaration with Await and Call Expressions", () => {
  it("renders a function declaration with an await expression and a call expression", async () => {
    const code = await render(
      <FunctionDeclaration async id="getData" params={["url"]}>
        <VariableDeclaration kind={VariableDeclarationKind.Const}>
          <VariableDeclarator id="result">
            <AwaitExpression
              name="fetch"
              arguments={<Identifier>url</Identifier>}
            />
          </VariableDeclarator>
        </VariableDeclaration>
      </FunctionDeclaration>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`async function getData(url) {
    const result = await fetch(url);
  }`);
  });
});
