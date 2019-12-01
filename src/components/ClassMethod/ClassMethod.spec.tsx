import React from 'react';
import { ClassMethod } from './ClassMethod';
import { render } from '../..';

describe('<ClassMethod />', () => {
  it('renders', () => {
    const code = render(<ClassMethod name="hello" />, { prettier: false });
    expect(code).toBe('hello() {}');
  });
});

describe('<ClassMethod static />', () => {
  it('renders', () => {
    const code = render(<ClassMethod static name="hello" />, {
      prettier: false
    });
    expect(code).toBe('static hello() {}');
  });
});
