import React from 'react';
import {
  ClassDeclaration,
  Code,
  FunctionDeclaration,
  Param,
  ReturnStatement,
  VariableDeclaration,
  render
} from '../src';

const code = render(
  <>
    <ClassDeclaration name="Hello" superClassName="Array">
      <Code>hello = 'world'</Code>
    </ClassDeclaration>
    <FunctionDeclaration
      name="add"
      params={[<Param key="a">a</Param>, <Param key="b">b</Param>]}
      returnStatement={<ReturnStatement>result</ReturnStatement>}
    >
      <VariableDeclaration kind="const" name="result">
        <ClassDeclaration name="SomeClass" />
      </VariableDeclaration>
    </FunctionDeclaration>
  </>
);

console.log(code);
