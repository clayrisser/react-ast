import React from 'react';
import { render } from '~/index';
import {
  TypeAnnotation,
  TypeReference,
  TypeParameterInstantiation
} from '~/components';
import VariableDeclarator from './index';

describe('<VariableDeclarator />', () => {
  it('renders', () => {
    const code = render(<VariableDeclarator id="v" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('v');
  });

  it('renders with type annotation', () => {
    const code = render(
      <VariableDeclarator
        id="v"
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
    expect(code).toBe('v: T');
  });

  it('renders with nested type annotation', () => {
    const code = render(
      <VariableDeclarator
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
    expect(code).toBe('v: T<A, B>');
  });

  it('renders with annotation as string', () => {
    const code = render(
      <VariableDeclarator id="v" typeAnnotation="T<A>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A>');
  });

  it('renders with initial value as string', () => {
    const code = render(
      <VariableDeclarator id="v" typeAnnotation="T<A>" debug>
        hello
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A> = "hello"');
  });

  it('renders with initial value as boolean', () => {
    const code = render(
      <VariableDeclarator id="v" typeAnnotation="T<A>" debug>
        {true}
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A> = true');
  });

  it('renders with initial value as number', () => {
    const code = render(
      <VariableDeclarator id="v" typeAnnotation="T<A>" debug>
        {0}
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('v: T<A> = 0');
  });

  it('renders with initial value as object', () => {
    const code = render(
      <VariableDeclarator id="v" typeAnnotation="T<A>" debug>
        {{ hello: 'world' }}
      </VariableDeclarator>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`v: T<A> = {
  "hello": "world"
}`);
  });
});
