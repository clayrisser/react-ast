import React from 'react';
import {
  ClassDeclaration,
  ClassMethod,
  ClassProperty,
  ExportDefaultDeclaration,
  ImportDeclaration,
  JsxElement,
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
    <ExportDefaultDeclaration>
      <ClassDeclaration name="Button" superClassName="Component">
        <ClassProperty static name="defaultProps">
          <Literal>{{ hello: 'world' }}</Literal>
        </ClassProperty>
        <ClassMethod
          name="render"
          returnStatement={
            <JsxElement name="Hello">{{ hello: 'world' }}</JsxElement>
          }
        />
      </ClassDeclaration>
    </ExportDefaultDeclaration>
  </>,
  {
    parserOptions: {
      plugins: ['jsx', 'classProperties']
    },
    prettier: {
      singleQuote: true
    }
  }
);

console.log(code);
