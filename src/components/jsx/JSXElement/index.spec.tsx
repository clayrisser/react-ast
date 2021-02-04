import React from 'react';
import { Identifier, ArrowFunctionExpression } from '~/components';
import { render } from '~/index';
import JSXElement from './index';

describe('<JSXElement />', () => {
  it('renders call expression', () => {
    const code = render(<JSXElement name="Hello" debug />, {
      prettier: false
    });
    expect(code).toBe('<Hello />');
  });

  it('renders call expression with argument', () => {
    const code = render(
      <JSXElement name="hello" arguments={<Identifier>a</Identifier>} debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello(a)');
  });

  it('renders call expression with arguments', () => {
    const code = render(
      <JSXElement
        name="hello"
        arguments={[<Identifier>a</Identifier>, <ArrowFunctionExpression />]}
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello(a, () => {})');
  });

  it('renders call expression with argument as string', () => {
    const code = render(<JSXElement name="hello" arguments="a" debug />, {
      prettier: false
    });
    expect(code).toBe('hello(a)');
  });

  it('renders call expression with arguments as string', () => {
    const code = render(
      <JSXElement name="hello" arguments={['a', 'b', 'c']} debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello(a, b, c)');
  });
});
