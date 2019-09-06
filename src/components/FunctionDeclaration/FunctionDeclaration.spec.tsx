import React from 'react';
import { FunctionDeclaration } from './FunctionDeclaration';
import { render } from '../..';

describe('<FunctionDeclaration />', () => {
  it('renders', () => {
    const code = render(<FunctionDeclaration name="hello" />);
    expect(code).toBe('function hello() {}');
  });
});
