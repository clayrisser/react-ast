import React from 'react';
import ReactFunctionalComponent from './ReactFunctionalComponent';
import { render, JsxElement } from '../../src';

const code = render(
  <ReactFunctionalComponent name="Button">
    <JsxElement name="Hello">{{ hello: 'world' }}</JsxElement>
  </ReactFunctionalComponent>,
  {
    parserOptions: {
      plugins: ['jsx', 'classProperties', 'typescript']
    },
    prettier: {
      singleQuote: true
    }
  }
);

console.log(code);
