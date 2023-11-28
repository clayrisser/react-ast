/**
 * File: /example/index.tsx
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

import {
  ClassDeclaration,
  FunctionDeclaration,
  Identifier,
  ReturnStatement,
  VariableDeclaration,
  VariableDeclarationKind,
  VariableDeclarator,
  render,
  renderAst,
  AwaitExpression,
  // StringLiteral,
  // NumberLiteral,
  // ObjectLiteral,
  // Smart,
  CallExpression,
  StringLiteral,
  // Var
} from "../src";

const logger = console;

const jsx = (
  <>
    <ClassDeclaration id="Hello" />
    <FunctionDeclaration id="add" params={["a", "b"]}>
      <VariableDeclaration kind={VariableDeclarationKind.Const}>
        <VariableDeclarator id="result">{0}</VariableDeclarator>
      </VariableDeclaration>
      <ReturnStatement>
        <Identifier>result</Identifier>
      </ReturnStatement>
    </FunctionDeclaration>
  </>
);

logger.log("======== RECONCILER LIFECYCLE ========");

// const stringLiteral = (
//   <Var name="a">
//     <StringLiteral ref={(r) => logger.log('R.NODE', r?.node)}>a</StringLiteral>
//   </Var>
// );

// const numberLiteral = (
//   <NumberLiteral ref={(r) => logger.log('R.NODE', r?.node)}>{1}</NumberLiteral>
// );

// const objectLiteral = (
//   <ObjectLiteral ref={(r) => logger.log('R.NODE', r?.node)}>
//     {JSON.stringify({ a: 1 })}
//   </ObjectLiteral>
// );

const callExpression = render(
  <CallExpression name="fn" arguments={<StringLiteral>Hi</StringLiteral>} />,
  { prettier: false },
);

logger.log("======== RENDER ========");
logger.log(callExpression);

// logger.log(render(jsx, { prettier: false }));

// logger.log(render(jsx, { prettier: false }));

// logger.log(render(stringLiteral, { prettier: false }));
// logger.log(render(numberLiteral, { prettier: false }));
// logger.log(render(objectLiteral, { prettier: false }));

const fuc = (
  <FunctionDeclaration async id="getData" params={["url"]}>
    <VariableDeclaration kind={VariableDeclarationKind.Const}>
      <VariableDeclarator id="result">
        <AwaitExpression>
          <CallExpression
            name="fetch"
            arguments={<Identifier>url</Identifier>}
          />
        </AwaitExpression>
      </VariableDeclarator>
    </VariableDeclaration>
  </FunctionDeclaration>
);

logger.log("======== RENDER AST ========");

logger.log(renderAst(fuc, { prettier: false }).program.body[0]);

logger.log("======== RENDER ========");
// logger.log(render(fuc, { prettier: false }));
