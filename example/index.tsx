import React from 'react';
import {
  ClassDeclaration,
  Code,
  FunctionDeclaration,
  Param,
  render
} from '../src';

const code = render(
  <ClassDeclaration name="Hello" superClassName="Array">
    <Code>const hello = 'world'</Code>
    <FunctionDeclaration name="foo" params={[<Param key="hello">hello</Param>]}>
      <Code>return bar</Code>
    </FunctionDeclaration>
  </ClassDeclaration>
);

console.log(code);
