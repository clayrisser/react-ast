import React from 'react';
import { render } from '~/index';
import {
  MethodSignature,
  PropertySignature,
  TypeParameterInstantiation,
  TypeReference
} from '~/components';
import Interface from './index';

describe('<Interface />', () => {
  it('renders', () => {
    const code = render(<Interface name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('interface Hello {}');
  });

  it('renders with type parameters', () => {
    const code = render(
      <Interface
        name="Hello"
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
    expect(code).toBe('interface Hello<A, B> {}');
  });

  it('renders with type parameters as string', () => {
    const code = render(<Interface name="Hello" typeParameters="T" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('interface Hello<T> {}');
  });

  it('renders with nested type parameters', () => {
    const code = render(
      <Interface
        name="Hello"
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
    expect(code).toBe('interface Hello<T<A, B>> {}');
  });

  it('renders with interface property signatures', () => {
    const code = render(
      <Interface name="Hello" debug>
        <PropertySignature id="hello" typeAnnotation="T" />
      </Interface>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`interface Hello {
  hello: T;
}`);
  });

  it('renders with interface method signatures', () => {
    const code = render(
      <Interface name="Hello" debug>
        <MethodSignature id="hello" returnType="T" />
      </Interface>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`interface Hello {
  hello(): T;
}`);
  });

  it('renders with interface method and property signatures', () => {
    const code = render(
      <Interface name="Hello" debug>
        <PropertySignature id="hello" typeAnnotation="T" />
        <MethodSignature id="hello" returnType="T" />
      </Interface>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`interface Hello {
  hello: T;
  hello(): T;
}`);
  });
});
