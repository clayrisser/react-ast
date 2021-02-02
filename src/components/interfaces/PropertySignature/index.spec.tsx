import React from 'react';
import { render } from '~/index';
import {
  TypeAnnotation,
  TypeReference,
  TypeParameterInstantiation
} from '~/components';
import PropertySignature, { PropertySignatureAccessibility } from './index';

describe('<PropertySignature />', () => {
  it('renders', () => {
    const code = render(<PropertySignature id="c" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('c;');
  });

  it('renders with accessibility', () => {
    const code = render(
      <PropertySignature
        id="c"
        accessibility={PropertySignatureAccessibility.Private}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('private c;');
  });

  it('renders with type annotation', () => {
    const code = render(
      <PropertySignature
        id="c"
        typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('c: T;');
  });

  it('renders with nested type annotation', () => {
    const code = render(
      <PropertySignature
        id="v"
        typeAnnotation={
          <TypeAnnotation>
            <TypeReference name="T">
              <TypeParameterInstantiation>
                <TypeReference name="A" />
                <TypeReference name="B" />
              </TypeParameterInstantiation>
            </TypeReference>
          </TypeAnnotation>
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
    expect(code).toBe('v: T<A, B>;');
  });

  it('renders with annotation as string', () => {
    const code = render(
      <PropertySignature id="v" typeAnnotation="T<A>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A>;');
  });

  it('renders with initial value as string', () => {
    const code = render(
      <PropertySignature id="v" typeAnnotation="T<A>" debug>
        hello
      </PropertySignature>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A> = "hello";');
  });

  it('renders with initial value as boolean', () => {
    const code = render(
      <PropertySignature id="v" typeAnnotation="T<A>" debug>
        {true}
      </PropertySignature>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A> = true;');
  });

  it('renders with initial value as number', () => {
    const code = render(
      <PropertySignature id="v" typeAnnotation="T<A>" debug>
        {0}
      </PropertySignature>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A> = 0;');
  });

  it('renders with initial value as object', () => {
    const code = render(
      <PropertySignature id="v" typeAnnotation="T<A>" debug>
        {{ hello: 'world' }}
      </PropertySignature>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`v: T<A> = {
  "hello": "world"
};`);
  });
});
