import React, { Component, ReactNode } from 'react';
import { oc } from 'ts-optchain.macro';
import { JsxAttribute } from '../JsxAttribute';
import { Smart } from '../..';

export interface JsxAttributes {
  [key: string]: ReactNode;
}

export interface JsxElementProps {
  children?: ReactNode;
  name: string;
  attributes?: JsxAttributes;
}

export class JsxElement extends Component<JsxElementProps> {
  renderAttributes() {
    return Object.entries(oc(this.props).attributes({})).map(
      ([key, value]: [string, ReactNode]) => {
        return <JsxAttribute name={key}>{value}</JsxAttribute>;
      }
    );
  }

  render() {
    let code = `<${this.props.name} />`;
    if (this.props.children) code = `<${this.props.name}></${this.props.name}>`;
    return (
      <Smart code={code} scopePath="expression" bodyPath="children">
        {this.renderAttributes()}
        {this.props.children}
      </Smart>
    );
  }
}
