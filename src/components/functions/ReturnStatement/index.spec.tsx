import React from 'react';
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
});
