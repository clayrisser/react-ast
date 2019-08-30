import React from 'react';
import {
  ClassDeclaration,
  Code,
  FunctionDeclaration,
  Param,
  ReturnStatement,
  render
} from '../src';

const code = render(
  <ClassDeclaration name="Hello" superClassName="Array">
    <Code>const hello = 'world'</Code>
    <FunctionDeclaration
      name="add"
      params={[<Param key="a">a</Param>, <Param key="b">b</Param>]}
      returnStatement={<ReturnStatement>result</ReturnStatement>}
    >
      <Code>const result=a+b</Code>
    </FunctionDeclaration>
  </ClassDeclaration>
);

console.log(code);
