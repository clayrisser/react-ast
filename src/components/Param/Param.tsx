import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface ParamProps {
  children: string;
  type?: ReactNode;
}

export class Param extends Component<ParamProps> {
  render() {
    const code = `function f(${this.props.children}) {}`;
    return (
      <Smart code={code} scopePath="params.0" parentBodyPath="params">
        {typeof this.props.type === 'string' ? (
          <TypeAnnotation>{this.props.type}</TypeAnnotation>
        ) : (
          this.props.type
        )}
      </Smart>
    );
  }
}
