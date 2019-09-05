import React, { Component, ReactNode } from 'react';
import { Smart } from '..';

export interface VariableDeclarationProps {
  children?: ReactNode;
  kind: string;
  name: string;
}

export class VariableDeclaration extends Component<VariableDeclarationProps> {
  static defaultProps = {
    kind: 'var'
  };

  render() {
    const code = `${this.props.kind} ${this.props.name};`;
    return (
      <Smart code={code} bodyPath="declarations.0.init">
        {this.props.children}
      </Smart>
    );
  }
}
