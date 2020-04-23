import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface InterfacePropertyProps {
  name: string;
  type?: ReactNode;
}

export class InterfaceProperty extends Component<InterfacePropertyProps> {
  renderTypeAnnotation() {
    return typeof this.props.type === 'string' ? (
      <TypeAnnotation>{this.props.type}</TypeAnnotation>
    ) : (
      this.props.type
    );
  }

  render() {
    const code = `interface I {${this.props.name}: any}`;
    return (
      <Smart
        code={code}
        scopePath="body.body.0"
        bodyPath="typeAnnotation"
        ref={(a: any) => console.log(a.node)}
      >
        {this.renderTypeAnnotation()}
      </Smart>
    );
  }
}
