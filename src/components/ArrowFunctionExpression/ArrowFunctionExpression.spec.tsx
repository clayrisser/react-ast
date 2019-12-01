import React from 'react';
import { ArrowFunctionExpression } from './ArrowFunctionExpression';
import { render } from '../..';

describe('<ArrowFunctionExpression />', () => {
  it('renders', () => {
    const code = render(<ArrowFunctionExpression />, {
      prettier: false
    });
    expect(code).toBe('() => {}');
  });
});
