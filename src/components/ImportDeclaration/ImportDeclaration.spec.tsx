import React from 'react';
import { ImportDeclaration } from './ImportDeclaration';
import { render } from '../..';

describe('<ImportDeclaration />', () => {
  it('renders', () => {
    const code = render(<ImportDeclaration name="hello" source="world" />);
    expect(code).toBe("import hello from 'world';");
  });
});
