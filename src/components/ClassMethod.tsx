import React, { Component, ReactNode } from 'react';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement } from '..';

export interface ClassMethodProps {
  children?: ReactNode;
  name: string;
  params?: (string | ReactNode)[];
  returnStatement?: string | ReactNode;
}

export class ClassMethod extends Component<ClassMethodProps> {
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
    if (!returnStatement) return <></>;
    if (typeof returnStatement !== 'string') return returnStatement;
    return <ReturnStatement>{returnStatement}</ReturnStatement>;
  }

  render() {
    const code = `class c {${this.props.name}() {}}`;
    return (
      <Smart code={code} scopePath="body.body.0">
        {this.renderParams()}
        {this.props.children}
        {this.renderReturnStatement()}
      </Smart>
    );
  }
}
