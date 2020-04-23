import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface ExportNamedDeclarationProps {
  children: ReactNode;
}

export class ExportNamedDeclaration extends Component<
  ExportNamedDeclarationProps
> {
  renderDeclaration() {
    const code = 'export class C{}';
    return (
      <Smart code={code} bodyPath="declaration">
        {this.props.children}
      </Smart>
    );
  }

  renderSpecifier(name: string) {
    const code = `export {${name}}`;
    return <Smart code={code} scopePath="specifiers.0" />;
  }

  renderSpecifiers(children: string[]) {
    const code = 'export {}';
    return (
      <Smart code={code} bodyPath="specifiers">
        {children.map((child: string) => this.renderSpecifier(child))}
      </Smart>
    );
  }

  render() {
    if (
      Array.isArray(this.props.children) &&
      this.props.children.length &&
      typeof this.props.children[0] === 'string'
    ) {
      return this.renderSpecifiers(this.props.children as string[]);
    }
    return this.renderDeclaration();
  }
}
