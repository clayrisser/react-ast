/**
 * File: /src/components/literals/ObjectLiteral/index.spec.tsx
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
import { render, ObjectLiteral, CallExpression, Var } from "../../../index";

describe("<ObjectLiteral />", () => {
  it("renders object", () => {
    const code = render(
      <ObjectLiteral debug>{JSON.stringify({ a: 1 })}</ObjectLiteral>,
      { prettier: false },
    );
    expect(code).toBe('{\n  "a": 1\n}');
  });

  it("renders object in call expression", () => {
    const code = render(
      <CallExpression
        name="test"
        debug
        arguments={[<ObjectLiteral>{JSON.stringify({ a: 1 })}</ObjectLiteral>]}
      />,
      { prettier: false },
    );
    expect(code).toBe('test({\n  "a": 1\n})');
  });

  it("renders object in variable", () => {
    const code = render(
      <Var name="test">
        <ObjectLiteral>{JSON.stringify({ a: 1 })}</ObjectLiteral>
      </Var>,
      { prettier: false },
    );
    expect(code).toBe('var test = {\n  "a": 1\n};');
  });
});
