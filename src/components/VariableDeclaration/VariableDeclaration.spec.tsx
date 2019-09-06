import React from 'react';
import { VariableDeclaration } from './VariableDeclaration';
import { render } from '../..';

describe('<VariableDeclaration />', () => {
  it('renders', () => {
    const code = render(
      <VariableDeclaration name="hello">world</VariableDeclaration>
    );
    expect(code).toBe("var hello = 'world';;");
  });
});
