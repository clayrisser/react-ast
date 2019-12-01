import React from 'react';
import { Code } from './Code';
import { render } from '../..';

describe('<Code />', () => {
  it('renders', () => {
    const code = render(<Code>const hello = 'world'</Code>, {
      prettier: false
    });
    expect(code).toBe("const hello = 'world';");
  });
});
