import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface ExportNamedDeclarationProps {
  children: ReactNode;
}

export class ExportNamedDeclaration extends Component<
  ExportNamedDeclarationProps
> {
  render() {
    const code = 'export class C{}';
    return (
      <Smart code={code} bodyPath="declaration">
        {this.props.children}
      </Smart>
    );
  }
}
