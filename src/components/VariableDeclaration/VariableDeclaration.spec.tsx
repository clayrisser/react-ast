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

describe('<VariableDeclaration type />', () => {
  it('renders', () => {
    const code = render(
      <VariableDeclaration name="hello" type="string">
        world
      </VariableDeclaration>,
      {
        parserOptions: { plugins: ['typescript'] },
        prettier: false
      }
    );
    expect(code).toBe("var hello: string = 'world';");
  });
});
