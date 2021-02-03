import React from 'react';
import { CallExpression } from '~/components';
import { render } from '~/index';
import ExpressionStatement from './index';

describe('<ExpressionStatement />', () => {
  it('renders expression statement', () => {
    const code = render(<ExpressionStatement debug />, {
      prettier: false
    });
    expect(code).toBe(';');
  });

  it('renders expression statement with children', () => {
    const code = render(
      <ExpressionStatement debug>
        <CallExpression name="hello" />
      </ExpressionStatement>,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello();');
  });
});
