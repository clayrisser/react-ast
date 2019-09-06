import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface ReturnStatementProps {
  children: ReactNode | number | string;
}

export class ReturnStatement extends Component<ReturnStatementProps> {
  renderChildren() {
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
    return this.props.children;
  }

  render() {
    const code = `function f() {return null}`;
    return (
      <Smart code={code} scopePath="body.body.0" bodyPath="argument">
        {this.renderChildren()}
      </Smart>
    );
  }
}
