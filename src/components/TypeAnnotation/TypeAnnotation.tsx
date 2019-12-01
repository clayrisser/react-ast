import React, { Component } from 'react';
import { Smart } from '../..';

export interface TypeAnnotationProps {
  children: string;
}

export class TypeAnnotation extends Component<TypeAnnotationProps> {
  render() {
    const code = `const c: ${this.props.children} = null`;
    return (
      <Smart
        code={code}
        scopePath="declarations.0.id.typeAnnotation"
        parentBodyPath="typeAnnotation"
      />
    );
  }
}
