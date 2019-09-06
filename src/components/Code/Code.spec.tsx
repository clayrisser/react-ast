import React from 'react';
import { Code } from './Code';
import { render } from '../..';

describe('<Code />', () => {
  it('renders', () => {
    const code = render(<Code>const hello = 'world'</Code>);
    expect(code).toBe("const hello = 'world';");
  });
});
