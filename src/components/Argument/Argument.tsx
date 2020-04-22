import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface ArgumentProps {
  children: string;
  type?: ReactNode;
}

export class Argument extends Component<ArgumentProps> {
  renderTypeAnnotations() {
    return typeof this.props.type === 'string' ? (
      <TypeAnnotation>{this.props.type}</TypeAnnotation>
    ) : (
      this.props.type
    );
  }

  render() {
    const code = `f(${this.props.children})`;
    return (
      <Smart
        code={code}
        parentBodyPath="arguments"
        scopePath="expression.arguments.0"
      >
        {this.renderTypeAnnotations()}
      </Smart>
    );
  }
}
