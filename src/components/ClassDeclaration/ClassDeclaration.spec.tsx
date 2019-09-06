import React from 'react';
import { ClassDeclaration } from './ClassDeclaration';
import { render } from '../..';

describe('<ClassDeclaration />', () => {
  it('renders', () => {
    const code = render(
      <ClassDeclaration name="Button" superClassName="Component" />
    );
    expect(code).toBe('class Button extends Component {}');
  });
});
