import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement } from '../..';

export interface ClassMethodProps {
  children?: ReactNode;
  name: string;
  params?: (string | ReactNode)[];
  returnStatement?: string | ReactNode;
  static?: boolean;
}

export class ClassMethod extends Component<ClassMethodProps> {
  static defaultProps = {
    static: false
  };

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
    const code = `class c {${this.props.static ? 'static ' : ''}${
      this.props.name
    }() {}}`;
    return (
      <Smart code={code} scopePath="body.body.0">
        {this.renderParams()}
        {this.props.children}
        {this.renderReturnStatement()}
      </Smart>
    );
  }
}
