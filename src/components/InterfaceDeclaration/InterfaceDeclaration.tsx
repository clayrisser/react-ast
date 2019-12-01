import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface InterfaceDeclarationProps {
  children?: ReactNode;
  extends?: string;
  name: string;
}

export class InterfaceDeclaration extends Component<InterfaceDeclarationProps> {
  render() {
    const code = `interface ${this.props.name} ${
      this.props.extends ? `extends ${this.props.extends} ` : ''
    }{}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
