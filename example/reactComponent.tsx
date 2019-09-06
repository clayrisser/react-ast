import React from 'react';
import {
  ClassDeclaration,
  ClassMethod,
  ImportDeclaration,
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
  </>,
  {
    parserOptions: {
      plugins: ['jsx']
    }
  }
);

console.log(code);
