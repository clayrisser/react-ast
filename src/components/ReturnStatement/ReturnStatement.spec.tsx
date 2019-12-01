import React from 'react';
import { ReturnStatement } from './ReturnStatement';
import { render, Literal } from '../..';

describe('<ReturnStatement />', () => {
  it('renders', () => {
    const code = render(<ReturnStatement>r</ReturnStatement>, {
      prettier: false
    });
    expect(code).toBe("return 'r';");
  });

  it('renders with react children', () => {
    const code = render(
      <ReturnStatement>
        <Literal>{[]}</Literal>
      </ReturnStatement>,
      { prettier: false }
    );
    expect(code).toBe('return [];');
  });
});
