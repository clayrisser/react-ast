import React from 'react';
import {
  ClassDeclaration,
  Literal,
  ClassMethod,
  ClassProperty,
  FunctionDeclaration,
  ImportDeclaration,
  JsxElement,
  Param,
  CallExpression,
  ReturnStatement,
  VariableDeclaration,
  render
} from '../src';

const code = render(
  <>
    <CallExpression name="hello" />
    <Literal>{{ a: 'a' }}</Literal>
    <JsxElement name="Hello" attributes={{ a: true, b: 'b', c: 55 }}>
      <JsxElement name="World" />
    </JsxElement>
    <JsxElement name="Hello" attributes={{ a: true, b: 'b', c: 55 }}>
      {88}
    </JsxElement>
    <ImportDeclaration
      defaultExport="hello"
      exports={['one', 'two']}
      source="world"
    />
    <ClassDeclaration name="Hello" superClassName="Array">
      <ClassMethod name="hello" params={['a']} returnStatement="a" />
      <ClassProperty name="hello">
        <JsxElement name="Hello" />
      </ClassProperty>
    </ClassDeclaration>
    <FunctionDeclaration
      name="add"
      params={[<Param key="a">a</Param>, <Param key="b">b</Param>]}
      returnStatement={
        <ReturnStatement>
          <Literal>{true}</Literal>
        </ReturnStatement>
      }
    >
      <VariableDeclaration kind="const" name="result">
        <ClassDeclaration name="SomeClass" />
      </VariableDeclaration>
    </FunctionDeclaration>
  </>,
  {
    parserOptions: {
      plugins: ['jsx', 'classProperties']
    }
  }
);

console.log(code);
