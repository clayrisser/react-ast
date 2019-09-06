import React, { Component } from 'react';
import { Smart } from '../..';

export interface ReturnStatementProps {
  children: string;
}

export class ReturnStatement extends Component<ReturnStatementProps> {
  render() {
    const code = `function f() {return ${this.props.children}}`;
    return <Smart code={code} scopePath="body.body.0" />;
  }
}
