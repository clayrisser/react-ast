import React from 'react';
import { render } from '~/index';
import {
  Identifier,
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

  it('renders anonymous function', () => {
    const code = render(<FunctionDeclaration debug />, {
      prettier: false
    });
    expect(code).toBe('function () {}');
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

  it('renders function with params as string', () => {
    const code = render(
      <FunctionDeclaration id="hello" params={['a', 'b', 'c']} debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe('function hello(a, b, c) {}');
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

  it('renders function with typed params', () => {
    const code = render(
      <FunctionDeclaration
        id="hello"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="T<A, B>">b</Identifier>,
          <Identifier
            typeAnnotation={
              <TypeAnnotation>
                <TypeReference name="T">
                  <TypeParameterInstantiation>
                    <TypeReference name="A" />
                    <TypeReference name="B" />
                    <TypeReference name="C" />
                  </TypeParameterInstantiation>
                </TypeReference>
              </TypeAnnotation>
            }
          >
            c
          </Identifier>
        ]}
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe('function hello(a: A, b: T<A, B>, c: T<A, B, C>) {}');
  });

  it('renders function with all props', () => {
    const code = render(
      <FunctionDeclaration
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="B">b</Identifier>
        ]}
        id="hello"
        debug
      >
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
    expect(code).toBe(`function hello(a: A, b: B): T<A, B> {
  var v: T = "hello";
}`);
  });
});
