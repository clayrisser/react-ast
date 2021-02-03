import React from 'react';
import { render } from '~/index';
import { ImportSpecifier } from '~/components';
import ImportDeclaration from './index';

describe('<ImportDeclaration />', () => {
  it('renders with default specifier', () => {
    const code = render(<ImportDeclaration defaultSpecifier="hello" debug />, {
      prettier: false
    });
    expect(code).toBe("import Hello from 'world'");
  });

  it('renders with specifiers', () => {
    const code = render(
      <ImportDeclaration
        specifiers={[
          <ImportSpecifier>hellow</ImportSpecifier>,
          <ImportSpecifier>howdy</ImportSpecifier>
        ]}
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import { hello, howdy } from 'world'");
  });

  it('renders with specifiers as string', () => {
    const code = render(
      <ImportDeclaration specifiers={['hello', 'howdy']} debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import { hello, howdy } from 'world'");
  });

  it('renders with specifiers and default specifier', () => {
    const code = render(
      <ImportDeclaration
        defaultSpecifier="hello"
        specifiers={[<ImportSpecifier>howdy</ImportSpecifier>]}
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import hello, { howdy } from 'world'");
  });
});
