import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, TypeAnnotation } from '../..';

export interface InterfaceMethodProps {
  name: string;
  params?: ReactNode[];
  returnType?: ReactNode;
}

export class InterfaceMethod extends Component<InterfaceMethodProps> {
  renderParams() {
    return oc(this.props)
      .params([])
      .map((param: ReactNode) => {
        if (typeof param === 'string') {
          return <Param key={param}>{param}</Param>;
        }
        return param;
      });
  }

  renderReturnType() {
    if (typeof this.props.returnType === 'string') {
      return <TypeAnnotation>{this.props.returnType}</TypeAnnotation>;
    }
    return this.props.returnType;
  }

  render() {
    const code = `interface I {${this.props.name}(): any}`;
    return (
      <Smart code={code} scopePath="body.body.0">
        {this.renderParams()}
        {this.renderReturnType()}
      </Smart>
    );
  }
}
