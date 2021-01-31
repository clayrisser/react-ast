import React from 'react';
import { render } from '~/index';
import Identifier from './index';

describe('<Identifier />', () => {
  it('renders', () => {
    const code = render(<Identifier debug>i</Identifier>, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('i');
  });
});
