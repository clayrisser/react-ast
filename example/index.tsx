import React from 'react';
import {
  ClassDeclaration,
  ClassMethod,
  Code,
  FunctionDeclaration,
  ImportDeclaration,
  Param,
  ReturnStatement,
  VariableDeclaration,
  render
} from '../src';

const code = render(
  <>
    <ImportDeclaration name="hello" source="world" />
    <ClassDeclaration name="Hello" superClassName="Array">
      <ClassMethod name="hello" params={['a']} returnStatement="a" />
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
