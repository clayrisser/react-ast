import React from 'react';
import { ClassDeclaration, Code, FunctionDeclaration, render } from '../src';

const code = render(
  <ClassDeclaration name="Hello" superClassName="Array">
    <Code>const hello = 'world'</Code>
    <FunctionDeclaration name="foo" params={['hello']}>
      <Code>return bar</Code>
    </FunctionDeclaration>
  </ClassDeclaration>
);

console.log(code);
