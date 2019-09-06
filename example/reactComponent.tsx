import React from 'react';
import {
  ImportDeclaration,
  ClassDeclaration,
  ClassMethod,
  render
} from '../src';

const code = render(
  <>
    <ImportDeclaration
      defaultExport="React"
      exports={['Component']}
      source="react"
    />
    <ClassDeclaration name="Button" superClassName="Component">
      <ClassMethod name="render" returnStatement="[]" />
    </ClassDeclaration>
  </>
);

console.log(code);
