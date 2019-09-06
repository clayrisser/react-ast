import React from 'react';
import { JsxAttribute } from './JsxAttribute';
import { render } from '../..';

describe('<JsxAttribute />', () => {
  it('renders', () => {
    const code = render(<JsxAttribute name="hello" />);
    expect(code).toBe('class Button extends Component {}');
  });
});
