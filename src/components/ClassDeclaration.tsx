import React, { Component, ReactNode } from 'react';
import { Smart } from '..';

export interface ClassDeclarationProps {
  children?: ReactNode;
  name: string;
  superClassName?: string;
}

export class ClassDeclaration extends Component<ClassDeclarationProps> {
  render() {
    const code = `class ${this.props.name} ${
      this.props.superClassName ? `extends ${this.props.superClassName} ` : ''
    }{}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
