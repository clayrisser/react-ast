import React from 'react';
import ReactElement from './ReactElement';
import { render, JsxElement } from '../../src';

const code = render(
  <ReactElement name="Button">
    <JsxElement name="Hello">{{ hello: 'world' }}</JsxElement>
  </ReactElement>,
  {
    parserOptions: {
      plugins: ['jsx', 'classProperties', 'typescript']
    },
    prettier: {
      singleQuote: true
    }
  }
);

console.log('\n\n---');
console.log(code);
