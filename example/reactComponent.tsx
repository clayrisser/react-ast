import React from 'react';
import {
  ClassDeclaration,
  ClassMethod,
  ClassProperty,
  ImportDeclaration,
  Literal,
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
      <ClassProperty static name="defaultProps">
        <Literal>{{ hello: 'world' }}</Literal>
      </ClassProperty>
      <ClassMethod name="render" returnStatement={<Literal>{[]}</Literal>} />
    </ClassDeclaration>
  </>,
  {
    parserOptions: {
      plugins: ['jsx', 'classProperties']
    }
  }
);

console.log(code);
