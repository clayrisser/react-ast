import React from 'react';
import ReactClassComponent from './ReactClassComponent';
import { render, JsxElement } from '../../src';

const code = render(
  <ReactClassComponent name="Button">
    <JsxElement name="Hello">{{ hello: 'world' }}</JsxElement>
  </ReactClassComponent>,
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
