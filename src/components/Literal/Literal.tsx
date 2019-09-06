import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface LiteralProps {
  children: ReactNode | number | string;
}

export class Literal extends Component<LiteralProps> {
  render() {
    if (typeof this.props.children === 'string') {
      const code = `'${this.props.children}'`;
      return <Smart code={code} scopePath="expression" />;
    }
    if (
      typeof this.props.children === 'number' ||
      typeof this.props.children === 'boolean'
    ) {
      return (
        <Smart code={this.props.children.toString()} scopePath="expression" />
      );
    }
    const code = `(${JSON.stringify(this.props.children)})`;
    return <Smart code={code} scopePath="expression" />;
  }
}
