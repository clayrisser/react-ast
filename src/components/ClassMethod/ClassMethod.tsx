import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { Smart, Param, ReturnStatement, TypeAnnotation } from '../..';

export interface ClassMethodProps {
  children?: ReactNode;
  name: string;
  params?: ReactNode[];
  returnStatement?: ReactNode;
  returnType?: ReactNode;
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

  renderReturnType() {
    if (typeof this.props.returnType === 'string') {
      return (
        <TypeAnnotation returnType>{this.props.returnType}</TypeAnnotation>
      );
    }
    return this.props.returnType;
  }

  render() {
    const code = `class c {${this.props.static ? 'static ' : ''}${
      this.props.name
    }() {}}`;
    return (
      <Smart code={code} scopePath="body.body.0">
        {this.renderParams()}
        {this.renderReturnStatement()}
        {this.renderReturnType()}
        {this.props.children}
      </Smart>
    );
  }
}
