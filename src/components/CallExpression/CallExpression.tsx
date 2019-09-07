import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface CallExpressionProps {
  name: string;
  arguments?: ReactNode | number | string;
}

export class CallExpression extends Component<CallExpressionProps> {
  renderArguments() {
    return this.props.arguments;
  }

  render() {
    const code = `${this.props.name}()`;
    return (
      <Smart code={code} scopePath="expression">
        {this.renderArguments}
      </Smart>
    );
  }
}
