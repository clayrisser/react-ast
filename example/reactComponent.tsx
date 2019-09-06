import React from 'react';
import { ClassDeclaration, ClassMethod, render } from '../src';

const code = render(
  <ClassDeclaration name="Button" superClassName="Component">
    <ClassMethod name="render" returnStatement="[]" />
  </ClassDeclaration>
);

console.log(code);
