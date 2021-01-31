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
    const code = render(<VariableDeclarator id="c" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('c');
  });

  it('renders with type annotation', () => {
    const code = render(
      <VariableDeclarator
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
    expect(code).toBe('c: T');
  });

  it('renders with nested type annotation', () => {
    const code = render(
      <VariableDeclarator
        id="c"
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
    expect(code).toBe('c: T<A, B>');
  });

  it('renders with complex type annotation as string', () => {
    const code = render(
      <VariableDeclarator id="c" typeAnnotation="T<A>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('c: T<A>');
  });
});
