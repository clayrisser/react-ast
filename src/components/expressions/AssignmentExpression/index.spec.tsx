import React from 'react';
import { render } from '~/index';
import AssignmentExpression from './index';
import {
  ArrowFunctionExpression,
  Identifier,
  MemberExpression
} from '~/components';

describe('<AssignmentExpression />', () => {
  it('renders with no children', () => {
    const code = render(<AssignmentExpression left="v" debug />, {
      prettier: false
    });
    expect(code).toBe('v = undefined');
  });

  it('renders with left as component', () => {
    const code = render(
      <AssignmentExpression
        left={
          <MemberExpression name="howdy" debug>
            <MemberExpression name="world">
              <Identifier>hello</Identifier>
            </MemberExpression>
          </MemberExpression>
        }
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello.world.howdy = undefined');
  });

  it('renders with initial value as string', () => {
    const code = render(
      <AssignmentExpression left="v" debug>
        hello
      </AssignmentExpression>,
      {
        prettier: false
      }
    );
    expect(code).toBe('v = "hello"');
  });

  it('renders with initial value as boolean', () => {
    const code = render(
      <AssignmentExpression left="v" debug>
        {true}
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v = true');
  });

  it('renders with initial value as number', () => {
    const code = render(
      <AssignmentExpression left="v" debug>
        {0}
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v = 0');
  });

  it('renders with initial value as object', () => {
    const code = render(
      <AssignmentExpression left="v" debug>
        {{ hello: 'world' }}
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`v = {
  "hello": "world"
}`);
  });

  it('renders with initial value as component', () => {
    const code = render(
      <AssignmentExpression left="v" debug>
        <ArrowFunctionExpression />
      </AssignmentExpression>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v = () => {}');
  });
});
