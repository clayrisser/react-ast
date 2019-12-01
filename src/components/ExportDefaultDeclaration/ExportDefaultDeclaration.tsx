import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface ExportDefaultDeclarationProps {
  children: ReactNode;
}

export class ExportDefaultDeclaration extends Component<
  ExportDefaultDeclarationProps
> {
  render() {
    const code = `export default class C{}`;
    return (
      <Smart code={code} bodyPath="declaration">
        {this.props.children}
      </Smart>
    );
  }
}
