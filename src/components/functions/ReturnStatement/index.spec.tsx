import React from 'react';
import { Identifier } from '~/components';
import { render } from '~/index';
import ReturnStatement from './index';

describe('<ReturnStatement />', () => {
  it('renders return statement', () => {
    const code = render(
      <ReturnStatement debug>{{ hello: 'world' }}</ReturnStatement>,
      {
        prettier: false
      }
    );
    expect(code).toBe(`return {
  "hello": "world"
};`);
  });

  it('renders return statement with children', () => {
    const code = render(
      <ReturnStatement debug>
        <Identifier>hello</Identifier>
      </ReturnStatement>,
      {
        prettier: false
      }
    );
    expect(code).toBe('return hello;');
  });
});
