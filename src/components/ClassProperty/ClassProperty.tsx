import React, { Component, ReactNode } from 'react';
import { Smart, Code } from '../..';

export interface ClassPropertyProps {
  children?: ReactNode;
  name: string;
  static?: boolean;
}

export class ClassProperty extends Component<ClassPropertyProps> {
  static defaultProps = {
    static: false
  };

  renderChildren() {
    if (typeof this.props.children === 'string') {
      const code = `'${this.props.children}'`;
      return <Code>{code}</Code>;
    }
    if (
      typeof this.props.children === 'number' ||
      typeof this.props.children === 'boolean'
    ) {
      return <Code>{this.props.children.toString()}</Code>;
    }
    return this.props.children;
  }

  render() {
    const code = `class C {${this.props.static ? 'static ' : ''}${
      this.props.name
    } = null}`;
    return (
      <Smart code={code} scopePath="body.body.0" bodyPath="value">
        {this.renderChildren()}
      </Smart>
    );
  }
}
