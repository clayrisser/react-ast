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
