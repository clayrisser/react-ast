import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { oc } from 'ts-optchain.macro';
import { JsxAttribute } from '../JsxAttribute';
import { Smart } from '../..';

export interface JsxAttributes {
  [key: string]: ReactNode;
}

export interface JsxElementProps {
  children?: ReactNode | number | string;
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

  renderChildren() {
    if (
      Array.isArray(this.props.children) &&
      this.props.children.length &&
      typeof this.props.children[0] === 'object' &&
      'key' in (this.props.children[0] as any) &&
      'ref' in (this.props.children[0] as any) &&
      'props' in (this.props.children[0] as any)
    ) {
      return this.props.children.map((child: ReactNode | number | string) => {
        return this.renderChild(child);
      });
    }
    return this.renderChild(this.props.children);
  }

  renderChild(child: ReactNode | number | string) {
    if (_.isNil(child) || (oc(child as any).type() as any) === JsxAttribute) {
      return <></>;
    }
    if (oc(child as any).type() === JsxElement) {
      return child;
    }
    if (typeof child === 'string') {
      return <Smart code={child} scopePath="expression" />;
    }
    if (
      typeof child === 'object' &&
      'key' in (child as any) &&
      'ref' in (child as any) &&
      'props' in (child as any)
    ) {
      return (
        <Smart
          code="<jsx>{}</jsx>"
          scopePath="expression.children.0"
          bodyPath="expression"
        >
          {child}
        </Smart>
      );
    }
    if (typeof child === 'object') child = JSON.stringify(child);
    const code = `<jsx>{${child}}</jsx>`;
    return <Smart code={code} scopePath="expression.children.0" />;
  }

  render() {
    let code = `<${this.props.name} />`;
    let { children } = this.props;
    if (Array.isArray(children)) {
      const filteredChildren = children.filter(
        (child) => oc(child as any).type() !== JsxAttribute
      );
      if (filteredChildren.length) {
        children = filteredChildren;
      } else {
        children = null;
      }
    } else if (oc(children as any).type() === JsxAttribute) {
      children = null;
    }
    if (children) code = `<${this.props.name}></${this.props.name}>`;
    return (
      <Smart code={code} scopePath="expression" bodyPath="children">
        {this.renderAttributes()}
        {this.renderChildren()}
      </Smart>
    );
  }
}
