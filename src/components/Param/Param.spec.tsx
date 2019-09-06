import React from 'react';
import { Param } from './Param';
import { render } from '../..';

describe('<Param />', () => {
  it('renders', () => {
    const code = render(<Param />);
    expect(code).toBe('class Button extends Component {}');
  });
});
