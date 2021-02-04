import React from 'react';
import {
  ExportSpecifier,
  VariableDeclaration,
  VariableDeclarator,
  ArrowFunctionExpression
} from '~/components';
import { render } from '~/index';
import Export from './index';

describe('<Export />', () => {
  it('renders empty named declaration', () => {
    const code = render(<Export debug />, {
      prettier: false
    });
    expect(code).toBe('export {};');
  });

  it('renders with specifier', () => {
    const code = render(
      <Export exports={<ExportSpecifier>hello</ExportSpecifier>} debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe('export { hello };');
  });

  it('renders with exports', () => {
    const code = render(
      <Export
        exports={[
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
    const code = render(<Export exports="hello" debug />, {
      prettier: false
    });
    expect(code).toBe('export { hello };');
  });

  it('renders with exports as string', () => {
    const code = render(<Export exports={['hello', 'world']} debug />, {
      prettier: false
    });
    expect(code).toBe('export { hello, world };');
  });

  it('renders with exports and from', () => {
    const code = render(
      <Export exports={['hello', 'world']} from="./world" debug />,
      {
        prettier: false
      }
    );
    expect(code).toBe("export { hello, world } from './world';");
  });

  it('renders with from', () => {
    const code = render(<Export from="world" debug />, {
      prettier: false
    });
    expect(code).toBe("export {} from 'world';");
  });

  it('renders with children', () => {
    const code = render(
      <Export debug>
        <VariableDeclaration>
          <VariableDeclarator id="hello">
            <ArrowFunctionExpression />
          </VariableDeclarator>
        </VariableDeclaration>
      </Export>,
      {
        prettier: false
      }
    );
    expect(code).toBe('export var hello = () => {};');
  });
});
