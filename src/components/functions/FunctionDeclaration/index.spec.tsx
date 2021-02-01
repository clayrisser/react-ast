import React from 'react';
import { BlockStatement } from '~/components';
import { render } from '~/index';
import FunctionDeclaration from './index';

describe('<FunctionDeclaration />', () => {
  it('renders empty function', () => {
    const code = render(<FunctionDeclaration id="hello" debug />, {
      prettier: false
    });
    expect(code).toBe('function hello() {}');
  });

  it('renders function with children', () => {
    const code = render(
      <FunctionDeclaration id="hello" debug>
        <BlockStatement />
      </FunctionDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe('function hello() {}');
  });

  it('renders function with children as string', () => {
    const code = render(
      <FunctionDeclaration id="hello" debug>
        const hello = 0;
      </FunctionDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toBe(`function hello() {
  const hello = 0;
}`);
  });
});
