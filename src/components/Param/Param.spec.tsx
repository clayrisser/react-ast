import React from 'react';
import { FunctionDeclaration } from '../FunctionDeclaration';
import { Param } from './Param';
import { render } from '../..';

describe('<Param />', () => {
  it('renders', () => {
    const code = render(
      <FunctionDeclaration name="f">
        <Param>p</Param>
      </FunctionDeclaration>
    );
    expect(code).toBe('function f(p) {}');
  });
});
