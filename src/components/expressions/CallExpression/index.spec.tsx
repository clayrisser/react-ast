import React from 'react';
import {
  Identifier,
  ArrowFunctionExpression,
  MemberExpression
} from '~/components';
import { render } from '~/index';
import CallExpression from './index';

describe('<CallExpression />', () => {
  it('renders call expression', () => {
    const code = render(<CallExpression name="hello" debug />, {
      prettier: false
    });
    expect(code).toBe('hello()');
  });

  it('renders call expression with children', () => {
    const code = render(
      <CallExpression name="world" debug>
        <MemberExpression name="hello">
          <Identifier>howdy</Identifier>
        </MemberExpression>
      </CallExpression>,
      {
        prettier: false
      }
    );
    expect(code).toBe('howdy.hello.world()');
  });

  it('renders call expression with argument', () => {
    const code = render(
      <CallExpression
        name="hello"
        arguments={<Identifier>a</Identifier>}
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello(a)');
  });

  it('renders call expression with arguments', () => {
    const code = render(
      <CallExpression
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
    const code = render(<CallExpression name="hello" arguments="a" debug />, {
      prettier: false
    });
    expect(code).toBe('hello(a)');
  });

  it('renders call expression with arguments as string', () => {
    const code = render(
      <CallExpression name="hello" arguments={['a', 'b', 'c']} debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello(a, b, c)');
  });
});
