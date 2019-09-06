import React, { Component, ReactNode } from 'react';
import { Smart } from '..';

export interface JsxAttributeProps {
  name: string;
  children?: ReactNode;
}

export class JsxAttribute extends Component<JsxAttributeProps> {
  render() {
    const code = `<Jsx ${this.props.name} />`;
    return (
      <Smart
        code={code}
        parentBodyPath="expression.openingElement.attributes"
        scopePath="expression.openingElement.attributes.0"
      />
    );
  }
}
