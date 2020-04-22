import React, { Component, ReactNode } from 'react';
import { oc } from 'ts-optchain.macro';
import { Smart, TypeParam } from '../..';

export interface TypeAnnotationProps {
  children: string;
  params?: ReactNode[];
  parentBodyPath?: string;
  returnType?: boolean;
}

export class TypeAnnotation extends Component<TypeAnnotationProps> {
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
    const code = `const c: ${this.props.children}${
      oc(this.props).params.length(0) ? '<>' : ''
    } = null`;
    return (
      <Smart
        code={code}
        parentBodyPath={
          this.props.parentBodyPath ||
          (this.props.returnType ? 'returnType' : 'typeAnnotation')
        }
        scopePath="declarations.0.id.typeAnnotation"
      >
        <Smart
          code={code}
          scopePath="declarations.0.id.typeAnnotation.typeAnnotation"
          parentBodyPath="typeAnnotation"
        >
          {this.renderTypeParams()}
        </Smart>
      </Smart>
    );
  }
}
