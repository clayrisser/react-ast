import React from 'react';
import { JsxElement } from './JsxElement';
import { render } from '../..';

describe('<JsxElement />', () => {
  it('renders jsx', () => {
    const code = render(<JsxElement name="Hello" />, {
      parserOptions: {
        plugins: ['jsx']
      }
    });
    expect(code).toBe('<Hello />;');
  });

  it('renders jsx with attributes', () => {
    const code = render(
      <JsxElement name="Hello" attributes={{ one: true }} />,
      {
        parserOptions: {
          plugins: ['jsx']
        }
      }
    );
    expect(code).toBe('<Hello one />;');
  });
});
