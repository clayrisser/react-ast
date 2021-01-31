import React from 'react';
import { Code } from '~/components';
import { render } from '~/index';
import BlockStatement from './index';

describe('<BlockStatement />', () => {
  it('renders', () => {
    const code = render(<BlockStatement debug />, {
      prettier: false
    });
    expect(code).toBe('{}');
  });

  it('renders with children', () => {
    const code = render(
      <BlockStatement debug>
        <Code>hello = &apos;world&apos;;</Code>
      </BlockStatement>,
      {
        prettier: false
      }
    );
    expect(code).toBe(`{
  hello = 'world';
}`);
  });
});
