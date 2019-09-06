import React, { Component } from 'react';
import { Smart } from '../..';

export interface CodeProps {
  children: string;
}

export class Code extends Component<CodeProps> {
  render() {
    return <Smart code={this.props.children} />;
  }
}
