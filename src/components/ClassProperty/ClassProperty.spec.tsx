import React from 'react';
import { ClassProperty } from './ClassProperty';
import { render } from '../..';

describe('<ClassProperty />', () => {
  it('renders', () => {
    const code = render(<ClassProperty name="hello">world</ClassProperty>, {
      parserOptions: { plugins: ['classProperties'] }
    });
    expect(code).toBe("hello = 'world';;");
  });
});

describe('<ClassProperty static />', () => {
  it('renders', () => {
    const code = render(
      <ClassProperty static name="hello">
        world
      </ClassProperty>,
      {
        parserOptions: { plugins: ['classProperties'] }
      }
    );
    expect(code).toBe("static hello = 'world';;");
  });
});
