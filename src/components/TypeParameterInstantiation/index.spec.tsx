import React from 'react';
import { TypeReference } from '~/components';
import { render } from '~/index';
import TypeParameterInstantiation from './index';

describe('<TypeParameterInstantiation />', () => {
  it('renders with children ', () => {
    const code = render(
      <TypeParameterInstantiation debug>
        <TypeReference name="A" />
        <TypeReference name="B" />
      </TypeParameterInstantiation>,
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
      <TypeParameterInstantiation debug>T</TypeParameterInstantiation>,
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
