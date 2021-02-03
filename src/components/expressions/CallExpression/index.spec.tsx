import React from 'react';
import { render } from '~/index';
import CallExpression from './index';

describe('<CallExpression />', () => {
  it('renders call expression', () => {
    const code = render(<CallExpression name="hello" debug />, {
      prettier: false
    });
    expect(code).toBe('hello()');
  });

  it('renders call expression with arguments', () => {
    const code = render(<CallExpression name="hello" arguments="a" debug />, {
      prettier: false
    });
    expect(code).toBe('hello(a)');
  });
});
