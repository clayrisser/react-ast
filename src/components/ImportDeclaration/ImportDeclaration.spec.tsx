import React from 'react';
import { ImportDeclaration } from './ImportDeclaration';
import { render } from '../..';

describe('<ImportDeclaration />', () => {
  it('imports default export', () => {
    const code = render(
      <ImportDeclaration defaultExport="hello" source="world" />,
      { prettier: false }
    );
    expect(code).toBe("import hello from 'world';");
  });

  it('renders', () => {
    const code = render(
      <ImportDeclaration exports={['one', 'two']} source="world" />,
      { prettier: false }
    );
    expect(code).toBe("import { one, two } from 'world';");
  });
});
