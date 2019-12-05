import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface PropertySignatureProps {
  name: string;
  type?: ReactNode;
}

export class PropertySignature extends Component<PropertySignatureProps> {
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
      <Smart code={code} scopePath="body.body.0" bodyPath="value">
        {this.renderTypeAnnotation()}
      </Smart>
    );
  }
}
