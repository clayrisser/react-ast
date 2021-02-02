import React from 'react';
import { TypeReference } from '~/components';
import { render } from '~/index';
import TypeParameterDeclaration from './index';

describe('<TypeParameterDeclaration />', () => {
  it('renders with children ', () => {
    const code = render(
      <TypeParameterDeclaration debug>
        <TypeReference name="A" />
        <TypeReference name="B" />
      </TypeParameterDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('<A, B>');
  });

  it('renders with children as string', () => {
    const code = render(
      <TypeParameterDeclaration debug>T</TypeParameterDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('<T>');
  });
});
