import React, { Component } from 'react';
import { Smart } from '..';

export interface ParamProps {
  children: string;
}

export class Param extends Component<ParamProps> {
  render() {
    const code = `function f(${this.props.children}) {}`;
    return <Smart code={code} scopePath="params.0" parentBodyPath="params" />;
  }
}
