import React from 'react';
import { render } from '~/index';
import ExportSpecifier from './index';

describe('<ExportSpecifier />', () => {
  it('renders import specifier', () => {
    const code = render(<ExportSpecifier debug>hello</ExportSpecifier>, {
      prettier: false
    });
    expect(code).toBe('hello');
  });

  it('renders import specifier with local', () => {
    const code = render(
      <ExportSpecifier local="world" debug>
        hello
      </ExportSpecifier>,
      {
        prettier: false
      }
    );
    expect(code).toBe('hello as world');
  });
});
