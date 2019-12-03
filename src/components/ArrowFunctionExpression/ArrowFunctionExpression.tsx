import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement, TypeAnnotation } from '../..';

export interface ArrowFunctionExpressionProps {
  children?: ReactNode;
  params?: ReactNode[];
  returnStatement?: ReactNode;
  returnType?: ReactNode;
}

export class ArrowFunctionExpression extends Component<
  ArrowFunctionExpressionProps
> {
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

  renderReturnStatement() {
    const { returnStatement } = this.props;
    if (_.isNil(returnStatement)) return <></>;
    return <ReturnStatement>{returnStatement}</ReturnStatement>;
  }

  renderReturnType() {
    if (typeof this.props.returnType === 'string') {
      return (
        <TypeAnnotation returnType>{this.props.returnType}</TypeAnnotation>
      );
    }
    return this.props.returnType;
  }

  render() {
    const code = `()${this.props.returnType ? ': any' : ''} => {}`;
    return (
      <Smart code={code} scopePath="expression">
        {this.renderParams()}
        {this.renderReturnStatement()}
        {this.renderReturnType()}
        {this.props.children}
      </Smart>
    );
  }
}
