import React from 'react';
import { render } from '~/index';
import JSXClosingElement from './index';

describe('<JSXClosingElement />', () => {
  it('renders call expression', () => {
    const code = render(<JSXClosingElement name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('</Hello>');
  });
});
