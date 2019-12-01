import React from 'react';
import { VariableDeclaration } from './VariableDeclaration';
import { render } from '../..';

describe('<VariableDeclaration />', () => {
  it('renders', () => {
    const code = render(
      <VariableDeclaration name="hello">world</VariableDeclaration>,
      { prettier: false }
    );
    expect(code).toBe("var hello = 'world';");
  });
});
