import React from 'react';
import { ReturnStatement } from './ReturnStatement';
import { render } from '../..';

describe('<ReturnStatement />', () => {
  it('renders', () => {
    const code = render(<ReturnStatement>r</ReturnStatement>);
    expect(code).toBe('return r;');
  });
});
