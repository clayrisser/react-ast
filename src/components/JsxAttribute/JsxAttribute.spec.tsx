import React from 'react';
import { JsxAttribute } from './JsxAttribute';
import { JsxElement } from '../JsxElement';
import { render } from '../..';

describe('<JsxAttribute />', () => {
  it('renders', () => {
    const code = render(
      <JsxElement name="Hello">
        <JsxAttribute name="hello">world</JsxAttribute>
      </JsxElement>,
      {
        parserOptions: {
          plugins: ['jsx']
        }
      }
    );
    expect(code).toBe('<Hello hello="world"></Hello>');
  });
});
