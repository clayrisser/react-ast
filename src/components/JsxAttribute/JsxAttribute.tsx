import React, { Component, ReactNode } from 'react';
import { Smart } from '../..';

export interface JsxAttributeProps {
  name: string;
  children?: ReactNode | string | number;
}

export class JsxAttribute extends Component<JsxAttributeProps> {
  render() {
    let code = '';
    if (typeof this.props.children === 'string') {
      code = `<Jsx ${this.props.name}="${this.props.children}" />`;
    } else if (typeof this.props.children === 'number') {
      code = `<Jsx ${this.props.name}={${this.props.children}} />`;
    } else if (typeof this.props.children === 'boolean') {
      if (this.props.children) {
        code = `<Jsx ${this.props.name} />`;
      } else {
        code = `<Jsx ${this.props.name}={false} />`;
      }
    }
    if (code.length) {
      return (
        <Smart
          code={code}
          parentBodyPath="openingElement.attributes"
          scopePath="expression.openingElement.attributes.0"
        />
      );
    }
    code = `<Jsx ${this.props.name}={null} />`;
    return (
      <Smart
        code={code}
        bodyPath="value.expression"
        parentBodyPath="openingElement.attributes"
        scopePath="expression.openingElement.attributes.0"
      >
        {this.props.children}
      </Smart>
    );
  }
}
