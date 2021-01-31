import React from 'react';
import { render, TypeReference, TypeParameterInstantiation } from '~/index';
import TypeAnnotation from './index';

describe('<TypeAnnotation />', () => {
  it('renders with children', () => {
    const code = render(
      <TypeAnnotation debug>
        <TypeReference name="T" />
      </TypeAnnotation>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(': T');
  });

  it('renders with nested children', () => {
    const code = render(
      <TypeAnnotation debug>
        <TypeReference name="T">
          <TypeParameterInstantiation>
            <TypeReference name="A" />
            <TypeReference name="B" />
          </TypeParameterInstantiation>
        </TypeReference>
      </TypeAnnotation>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(': T<A, B>');
  });

  it('renders with children as string', () => {
    const code = render(<TypeAnnotation debug>T</TypeAnnotation>, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe(': T');
  });
});
