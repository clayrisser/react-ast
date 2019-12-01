import React from 'react';
import { InterfaceDeclaration } from './InterfaceDeclaration';
import { render } from '../..';

describe('<InterfaceDeclaration />', () => {
  it('renders', () => {
    const code = render(
      <InterfaceDeclaration name="Button" extends="Component" />,
      {
        parserOptions: {
          plugins: ['typescript']
        },
        prettier: false
      }
    );
    expect(code).toBe('interface Button extends Component {}');
  });
});
