import React from 'react';
import { JsxElement } from '../JsxElement';
import { render } from '../..';

describe('<JsxAttribute />', () => {
  it('renders', () => {
    const code = render(
      <JsxElement name="Hello" attributes={{ hello: 'world' }} />,
      {
        parserOptions: {
          plugins: ['jsx']
        }
      }
    );
    expect(code).toBe('<Hello hello="world" />');
  });
});
