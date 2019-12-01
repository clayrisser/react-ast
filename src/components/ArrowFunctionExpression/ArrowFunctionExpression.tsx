import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement } from '../..';

export interface ArrowFunctionExpressionProps {
  children?: ReactNode;
  params?: (string | ReactNode)[];
  returnStatement?: string | ReactNode;
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

  render() {
    const code = '() => {}';
    return (
      <Smart code={code} scopePath="expression">
        {this.renderParams()}
        {this.props.children}
        {this.renderReturnStatement()}
      </Smart>
    );
  }
}
