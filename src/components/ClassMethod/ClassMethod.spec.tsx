import React from 'react';
import { ClassMethod } from './ClassMethod';
import { render } from '../..';

describe('<ClassMethod />', () => {
  it('renders', () => {
    const code = render(<ClassMethod name="hello" />);
    expect(code).toBe('class Button extends Component {}');
  });
});
