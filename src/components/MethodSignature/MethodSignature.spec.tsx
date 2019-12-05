import React from 'react';
import { MethodSignature } from './MethodSignature';
import { render } from '../..';

describe('<MethodSignature />', () => {
  it('renders', () => {
    const code = render(<MethodSignature name="hello" />, {
      parserOptions: {
        plugins: ['typescript']
      },
      prettier: false
    });
    expect(code).toBe('hello(): any;');
  });
});

describe('<MethodSignature returnType />', () => {
  it('renders', () => {
    const code = render(<MethodSignature name="hello" returnType="string" />, {
      prettier: false,
      parserOptions: {
        plugins: ['typescript']
      }
    });
    expect(code).toBe('hello(): string;');
  });
});

describe('<MethodSignature params />', () => {
  it('renders', () => {
    const code = render(<MethodSignature name="hello" params={['world']} />, {
      prettier: false,
      parserOptions: {
        plugins: ['typescript']
      }
    });
    expect(code).toBe('hello(world): any;');
  });
});
