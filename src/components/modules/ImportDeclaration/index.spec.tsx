import React from 'react';
import { render } from '~/index';
import { ImportSpecifier } from '~/components';
import ImportDeclaration from './index';

describe('<ImportDeclaration />', () => {
  it('renders with default specifier', () => {
    const code = render(
      <ImportDeclaration defaultSpecifier="hello" source="world" debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import hello from 'world';");
  });

  it('renders with namespace specifier', () => {
    const code = render(
      <ImportDeclaration namespaceSpecifier="hello" source="world" debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import * as hello from 'world';");
  });

  it('renders with namespace specifier override', () => {
    const code = render(
      <ImportDeclaration
        namespaceSpecifier="hello"
        defaultSpecifier="hello"
        specifiers="hello"
        source="world"
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import * as hello from 'world';");
  });

  it('renders with specifier', () => {
    const code = render(
      <ImportDeclaration specifiers="hello" source="world" debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import { hello } from 'world';");
  });

  it('renders with specifiers', () => {
    const code = render(
      <ImportDeclaration
        specifiers={[
          <ImportSpecifier>hello</ImportSpecifier>,
          <ImportSpecifier>howdy</ImportSpecifier>
        ]}
        source="world"
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import { hello, howdy } from 'world';");
  });

  it('renders with specifiers as string', () => {
    const code = render(
      <ImportDeclaration
        specifiers={['hello', 'howdy']}
        source="world"
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import { hello, howdy } from 'world';");
  });

  it('renders with specifiers and default specifier', () => {
    const code = render(
      <ImportDeclaration
        defaultSpecifier="hello"
        specifiers={[<ImportSpecifier>howdy</ImportSpecifier>]}
        source="world"
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe("import hello, { howdy } from 'world';");
  });
});
