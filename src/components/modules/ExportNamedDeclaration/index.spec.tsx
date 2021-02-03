import React from 'react';
import { ExportSpecifier } from '~/components';
import { render } from '~/index';
import ExportNamedDeclaration from './index';

describe('<ExportNamedDeclaration />', () => {
  it('renders empty named declaration', () => {
    const code = render(<ExportNamedDeclaration debug />, {
      prettier: false
    });
    expect(code).toBe('export {};');
  });

  it('renders with specifier', () => {
    const code = render(
      <ExportNamedDeclaration
        specifiers={<ExportSpecifier>hello</ExportSpecifier>}
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe('export { hello };');
  });

  it('renders with specifiers', () => {
    const code = render(
      <ExportNamedDeclaration
        specifiers={[
          <ExportSpecifier>hello</ExportSpecifier>,
          <ExportSpecifier>world</ExportSpecifier>
        ]}
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe('export { hello, world };');
  });

  it('renders with specifier as string', () => {
    const code = render(<ExportNamedDeclaration specifiers="hello" debug />, {
      prettier: false
    });
    expect(code).toBe('export { hello };');
  });

  it('renders with specifiers as string', () => {
    const code = render(
      <ExportNamedDeclaration specifiers={['hello', 'world']} debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe('export { hello, world };');
  });

  it('renders with specifiers and source', () => {
    const code = render(
      <ExportNamedDeclaration
        specifiers={['hello', 'world']}
        source="./world"
        debug
      />,
      {
        prettier: false
      }
    );
    expect(code).toBe("export { hello, world } from './world';");
  });

  it('renders with source', () => {
    const code = render(<ExportNamedDeclaration source="world" debug />, {
      prettier: false
    });
    expect(code).toBe("export {} from 'world';");
  });
});
