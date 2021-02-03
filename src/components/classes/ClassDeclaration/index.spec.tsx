import React from 'react';
import { render } from '~/index';
import {
  ClassMethod,
  ClassMethodAccessibility,
  ClassProperty,
  ClassPropertyAccessibility,
  TypeParameterInstantiation,
  TypeReference
} from '~/components';
import ClassDeclaration from './index';

describe('<ClassDeclaration />', () => {
  it('renders', () => {
    const code = render(<ClassDeclaration id="Hello" debug />, {
      prettier: false
    });
    expect(code).toBe('class Hello {}');
  });

  it('renders with type parameters', () => {
    const code = render(
      <ClassDeclaration
        id="Hello"
        typeParameters={['A', <TypeReference name="B" />]}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('class Hello<A, B> {}');
  });

  it('renders with type parameters as string', () => {
    const code = render(
      <ClassDeclaration id="Hello" typeParameters="T" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('class Hello<T> {}');
  });

  it('renders with nested type parameters', () => {
    const code = render(
      <ClassDeclaration
        id="Hello"
        typeParameters={
          <TypeReference name="T">
            <TypeParameterInstantiation>
              <TypeReference name="A" />
              <TypeReference name="B" />
            </TypeParameterInstantiation>
          </TypeReference>
        }
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('class Hello<T<A, B>> {}');
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

  it('renders with class methods', () => {
    const code = render(
      <ClassDeclaration id="Hello" debug>
        <ClassMethod
          id="hello"
          returnType="T"
          accessibility={ClassMethodAccessibility.Protected}
        />
      </ClassDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`class Hello {
  protected hello(): T {}
}`);
  });

  it('renders with class properties and methods', () => {
    const code = render(
      <ClassDeclaration id="Hello" debug>
        <ClassProperty
          id="hello"
          typeAnnotation="T"
          accessibility={ClassPropertyAccessibility.Protected}
        >
          world
        </ClassProperty>
        <ClassMethod
          id="hello"
          returnType="T"
          accessibility={ClassMethodAccessibility.Protected}
        />
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

  protected hello(): T {}
}`);
  });
});
