import React, { Component } from 'react';
import { Smart } from '../..';

export interface TypeParamProps {
  children: string;
}

export class TypeParam extends Component<TypeParamProps> {
  render() {
    const code = `const c: T<${this.props.children}> = null`;
    return (
      <Smart
        code={code}
        parentBodyPath="typeParameters.params"
        scopePath="declarations.0.id.typeAnnotation.typeAnnotation.typeParameters.params.0"
      />
    );
  }
}
