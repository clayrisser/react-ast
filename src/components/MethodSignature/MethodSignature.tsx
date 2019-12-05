import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement, TypeAnnotation } from '../..';

export interface MethodSignatureProps {
  name: string;
  params?: ReactNode[];
  returnStatement?: ReactNode;
  returnType?: ReactNode;
}

export class MethodSignature extends Component<MethodSignatureProps> {
  renderParams() {
    return oc(this.props)
      .params([])
      .map((param: ReactNode) => {
        if (typeof param === 'string') {
          return (
            <Param signature key={param}>
              {param}
            </Param>
          );
        }
        return param;
      });
  }

  renderReturnStatement() {
    const { returnStatement } = this.props;
    if (_.isNil(returnStatement)) return <></>;
    return <ReturnStatement>{returnStatement}</ReturnStatement>;
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
        {this.renderReturnStatement()}
        {this.renderReturnType()}
      </Smart>
    );
  }
}
