import React from 'react';
import { PropertySignature } from './PropertySignature';
import { render } from '../..';

describe('<PropertySignature />', () => {
  it('renders', () => {
    const code = render(<PropertySignature name="hello" />, {
      parserOptions: { plugins: ['classProperties', 'typescript'] },
      prettier: false
    });
    expect(code).toBe('hello: any;');
  });
});

describe('<PropertySignature type />', () => {
  it('renders', () => {
    const code = render(<PropertySignature name="hello" type="string" />, {
      parserOptions: { plugins: ['classProperties', 'typescript'] },
      prettier: false
    });
    expect(code).toBe('hello: string;');
  });
});
