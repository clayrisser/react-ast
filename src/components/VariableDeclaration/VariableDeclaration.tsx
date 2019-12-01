import React, { Component, ReactNode } from 'react';
import { Smart, TypeAnnotation } from '../..';

export interface VariableDeclarationProps {
  children?: ReactNode;
  kind: string;
  name: string;
  type?: ReactNode;
}

export class VariableDeclaration extends Component<VariableDeclarationProps> {
  static defaultProps = {
    kind: 'var'
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

  render() {
    const code = `${this.props.kind} ${this.props.name} = null`;
    return (
      <Smart code={code} bodyPath="declarations.0.init">
        <Smart
          code={code}
          scopePath="declarations.0.id"
          parentBodyPath="declarations.0.id"
        >
          {typeof this.props.type === 'string' ? (
            <TypeAnnotation>{this.props.type}</TypeAnnotation>
          ) : (
            this.props.type
          )}
        </Smart>
        {this.renderChildren()}
      </Smart>
    );
  }
}
