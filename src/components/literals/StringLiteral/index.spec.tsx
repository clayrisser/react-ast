import React from 'react';
import { CallExpression, StringLiteral, Var, render } from '~/index';

describe('<StringLiteral />', () => {
  it('renders string', () => {
    const code = render(<StringLiteral debug>HI</StringLiteral>, {
      prettier: false
    });
    expect(code).toBe('"HI"');
  });

  it('renders string inside function argument', () => {
    const code = render(
      <CallExpression
        name="fn"
        arguments={<StringLiteral>Hi</StringLiteral>}
      />,
      { prettier: false }
    );
    expect(code).toBe('fn("Hi")');
  });

  it('renders code as a string', () => {
    const code = render(
      <Var name="a">
        <StringLiteral>a</StringLiteral>
      </Var>,
      {
        prettier: false
      }
    );
    expect(code).toBe('var a = "a";');
  });
});
