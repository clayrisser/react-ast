import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface ClassPropertyProps {
  children?: ReactNode;
  name: string;
  static?: boolean;
  type?: ReactNode;
}

export class ClassProperty extends Component<ClassPropertyProps> {
  static defaultProps = {
    static: false
  };

  renderChildren() {
    if (typeof this.props.children === 'string') {
      const code = `'${this.props.children}'`;
      return <Smart code={code} scopePath="expression" />;
    }
    if (
      typeof this.props.children === 'number' ||
      typeof this.props.children === 'boolean'
    ) {
      return (
        <Smart code={this.props.children.toString()} scopePath="expression" />
      );
    }
    return this.props.children;
  }

  renderTypeAnnotation() {
    return typeof this.props.type === 'string' ? (
      <TypeAnnotation>{this.props.type}</TypeAnnotation>
    ) : (
      this.props.type
    );
  }

  render() {
    const code = `class C {${this.props.static ? 'static ' : ''}${
      this.props.name
    } = null}`;
    return (
      <Smart code={code} scopePath="body.body.0" bodyPath="value">
        {this.renderTypeAnnotation()}
        {this.renderChildren()}
      </Smart>
    );
  }
}
