import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface ParamProps {
  children: string;
  default?: ReactNode;
  signature?: boolean;
  type?: ReactNode;
}

export class Param extends Component<ParamProps> {
  renderDefault() {
    if (!this.props.default) return null;
    const code = `function f(${this.props.children} = '') {}`;
    return (
      <Smart parentBodyPath="right" bodyPath="." code={code}>
        {this.props.default}
      </Smart>
    );
  }

  renderTypeAnnotations() {
    return typeof this.props.type === 'string' ? (
      <TypeAnnotation
        parentBodyPath={this.props.default ? 'left.typeAnnotation' : undefined}
      >
        {this.props.type}
      </TypeAnnotation>
    ) : (
      this.props.type
    );
  }

  render() {
    const code = this.props.default
      ? `function f(${this.props.children} = '') {}`
      : `function f(${this.props.children}) {}`;
    return (
      <Smart
        code={code}
        scopePath="params.0"
        parentBodyPath={this.props.signature ? 'parameters' : 'params'}
      >
        {this.renderTypeAnnotations()}
        {this.renderDefault()}
      </Smart>
    );
  }
}
