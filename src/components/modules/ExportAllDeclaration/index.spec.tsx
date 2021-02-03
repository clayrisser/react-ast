import React from 'react';
import { render } from '~/index';
import ExportAllDeclaration from './index';

describe('<ExportAllDeclaration />', () => {
  it('renders with source', () => {
    const code = render(<ExportAllDeclaration source="world" debug />, {
      prettier: false
    });
    expect(code).toBe("export * from 'world';");
  });
});
