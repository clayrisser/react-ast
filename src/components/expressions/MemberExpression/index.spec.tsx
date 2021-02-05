import React from 'react';
import { render } from '~/index';
import { Identifier } from '~/components';
import MemberExpression from './index';

describe('<MemberExpression />', () => {
  it('renders memeber expression with children', () => {
    const code = render(
      <MemberExpression name="howdy" debug>
        <MemberExpression name="world">
          <Identifier>hello</Identifier>
        </MemberExpression>
      </MemberExpression>,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello.world.howdy');
  });
});
