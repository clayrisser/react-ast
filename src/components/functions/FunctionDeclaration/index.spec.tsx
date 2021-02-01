import React from 'react';
import { render } from '~/index';
import {
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
  VariableDeclaration,
  VariableDeclarator
} from '~/components';
import FunctionDeclaration from './index';

describe('<FunctionDeclaration />', () => {
  it('renders empty function', () => {
    const code = render(<FunctionDeclaration id="hello" debug />, {
      prettier: false
    });
    expect(code).toBe('function hello() {}');
  });

  it('renders function with nested return type', () => {
    const code = render(
      <FunctionDeclaration
        id="hello"
        returnType={
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
    expect(code).toBe('function hello(): T<A, B> {}');
  });

  it('renders function with return type as string', () => {
    const code = render(
      <FunctionDeclaration id="hello" returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('function hello(): T<A, B, C> {}');
  });

  it('renders function with nested children', () => {
    const code = render(
      <FunctionDeclaration id="hello" debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </FunctionDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`function hello() {
  var v: T = "hello";
}`);
  });

  it('renders function with children as string', () => {
    const code = render(
      <FunctionDeclaration id="hello" debug>
        const hello = 0;
      </FunctionDeclaration>,
      {
        prettier: false
      }
    );
    expect(code).toBe(`function hello() {
  const hello = 0;
}`);
  });
});
