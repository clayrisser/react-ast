import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement } from '../..';

export interface FunctionDeclarationProps {
  children?: ReactNode;
  name: string;
  params?: ReactNode[];
  returnStatement?: string | ReactNode;
}

export class FunctionDeclaration extends Component<FunctionDeclarationProps> {
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
    const code = `function ${this.props.name}() {}`;
    return (
      <Smart code={code}>
        {this.renderParams()}
        {this.props.children}
        {this.renderReturnStatement()}
      </Smart>
    );
  }
}
