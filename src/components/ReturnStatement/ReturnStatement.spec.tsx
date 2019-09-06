import React from 'react';
import { ReturnStatement } from './ReturnStatement';
import { render } from '../..';

describe('<ReturnStatement />', () => {
  it('renders', () => {
    const code = render(<ReturnStatement />);
    expect(code).toBe('class Button extends Component {}');
  });
});
