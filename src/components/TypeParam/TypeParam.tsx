import React, { Component, ReactNode } from 'react';
import { oc } from 'ts-optchain.macro';
import { Smart } from '../..';

export interface TypeParamProps {
  children: string;
  params?: ReactNode[];
}

export class TypeParam extends Component<TypeParamProps> {
  renderTypeParams() {
    return oc(this.props)
      .params([])
      .map((param: ReactNode) => {
        if (typeof param === 'string') {
          return <TypeParam key={param}>{param}</TypeParam>;
        }
        return param;
      });
  }

  render() {
    const code = `const c: T<${this.props.children}${
      oc(this.props).params.length(0) ? '<>' : ''
    }> = null`;
    return (
      <Smart
        code={code}
        parentBodyPath="typeParameters.params"
        scopePath="declarations.0.id.typeAnnotation.typeAnnotation.typeParameters.params.0"
      >
        {this.renderTypeParams()}
      </Smart>
    );
  }
}
