import React from 'react';
import { FunctionExpression } from './FunctionExpression';
import { render } from '../..';

describe('<FunctionExpression />', () => {
  it('renders', () => {
    const code = render(<FunctionExpression />, {
      prettier: false
    });
    expect(code).toBe('function () {}');
  });
});

describe('<FunctionExpression returnType="any" />', () => {
  it('renders', () => {
    const code = render(<FunctionExpression returnType="any" />, {
      prettier: false,
      parserOptions: {
        plugins: ['typescript']
      }
    });
    expect(code).toBe('function (): any {}');
  });
});
