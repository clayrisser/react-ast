import React, { Component, ReactNode } from 'react';
import { Code } from '../Code';
import { Smart } from '../..';

export interface VariableDeclarationProps {
  children?: ReactNode | string | number;
  kind: string;
  name: string;
}

export class VariableDeclaration extends Component<VariableDeclarationProps> {
  static defaultProps = {
    kind: 'var'
  };

  renderChildren() {
    if (typeof this.props.children === 'string') {
      const code = `'${this.props.children}'`;
      return <Code>{code}</Code>;
    }
    if (
      typeof this.props.children === 'number' ||
      typeof this.props.children === 'boolean'
    ) {
      return <Code>this.props.children</Code>;
    }
    return this.props.children;
  }

  render() {
    const code = `${this.props.kind} ${this.props.name} = null`;
    return (
      <Smart code={code} bodyPath="declarations.0.init">
        {this.renderChildren()}
      </Smart>
    );
  }
}
