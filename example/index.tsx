import React from 'react';
import { render, Code, ClassDeclaration, FunctionDeclaration } from '../src';

const code = render(
  <ClassDeclaration identifierName="Hello" superClassName="Array">
    <Code>const hello = 'world'</Code>
    <FunctionDeclaration identifierName="foo">
      <Code>return 'bar'</Code>
    </FunctionDeclaration>
  </ClassDeclaration>
);

console.log(code);
