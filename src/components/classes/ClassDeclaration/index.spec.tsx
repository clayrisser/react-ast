import React from 'react';
import { render } from '~/index';
import { ClassProperty, ClassPropertyAccessibility } from '~/components';
import ClassDeclaration from './index';

describe('<ClassDeclaration />', () => {
  it('renders', () => {
    const code = render(<ClassDeclaration id="Hello" debug />, {
      prettier: false
    });
    expect(code).toBe('class Hello {}');
  });

  it('renders with class properties', () => {
    const code = render(
      <ClassDeclaration id="Hello" debug>
        <ClassProperty
          id="hello"
          typeAnnotation="T"
          accessibility={ClassPropertyAccessibility.Protected}
        >
          world
        </ClassProperty>
      </ClassDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`class Hello {
  protected hello: T = "world";
}`);
  });
});
