import React from 'react';
import { ClassDeclaration } from '../ClassDeclaration';
import { ExportNamedDeclaration } from './ExportNamedDeclaration';
import { render } from '../..';

describe('<ExportNamedDeclaration />', () => {
  it('renders', () => {
    const code = render(
      <ExportNamedDeclaration>
        <ClassDeclaration name="Button" />
      </ExportNamedDeclaration>,
      { prettier: false }
    );
    expect(code).toBe('export class Button {}');
  });
});
