import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface ParamProps {
  children: string;
  type?: ReactNode;
  signature?: boolean;
}

export class Param extends Component<ParamProps> {
  renderTypeAnnotations() {
    return typeof this.props.type === 'string' ? (
      <TypeAnnotation>{this.props.type}</TypeAnnotation>
    ) : (
      this.props.type
    );
  }

  render() {
    const code = `function f(${this.props.children}) {}`;
    return (
      <Smart
        code={code}
        scopePath="params.0"
        parentBodyPath={this.props.signature ? 'parameters' : 'params'}
      >
        {this.renderTypeAnnotations()}
      </Smart>
    );
  }
}
