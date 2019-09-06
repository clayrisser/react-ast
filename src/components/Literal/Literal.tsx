import React, { Component, ReactNode } from 'react';
import { Code, Smart } from '../..';

export interface LiteralProps {
  children: ReactNode | number | string;
}

export class Literal extends Component<LiteralProps> {
  render() {
    if (typeof this.props.children === 'string') {
      const code = `'${this.props.children}'`;
      return <Code>{code}</Code>;
    }
    if (
      typeof this.props.children === 'number' ||
      typeof this.props.children === 'boolean'
    ) {
      return <Code>{this.props.children.toString()}</Code>;
    }
    const code = `(${JSON.stringify(this.props.children)})`;
    return <Smart code={code} scopePath="expression" />;
  }
}
