import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement } from '../..';

export interface FunctionExpressionProps {
  children?: ReactNode;
  name?: string;
  params?: (string | ReactNode)[];
  returnStatement?: string | ReactNode;
}

export class FunctionExpression extends Component<FunctionExpressionProps> {
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
    const code = `const c = function${
      this.props.name ? ` ${this.props.name}` : ''
    }() {}`;
    return (
      <Smart code={code} scopePath="declarations.0.init">
        {this.renderParams()}
        {this.props.children}
        {this.renderReturnStatement()}
      </Smart>
    );
  }
}
