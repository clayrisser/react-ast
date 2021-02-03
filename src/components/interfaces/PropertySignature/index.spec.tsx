import React from 'react';
import { render } from '~/index';
import {
  TypeAnnotation,
  TypeReference,
  TypeParameterInstantiation
} from '~/components';
import PropertySignature from './index';

describe('<PropertySignature />', () => {
  it('renders', () => {
    const code = render(<PropertySignature id="p" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe('p;');
  });

  it('renders with type annotation', () => {
    const code = render(
      <PropertySignature
        id="p"
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
    expect(code).toBe('p: T;');
  });

  it('renders with nested type annotation', () => {
    const code = render(
      <PropertySignature
        id="p"
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
    expect(code).toBe('p: T<A, B>;');
  });

  it('renders with annotation as string', () => {
    const code = render(
      <PropertySignature id="p" typeAnnotation="T<A>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('p: T<A>;');
  });
});
