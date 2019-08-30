import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { oc } from 'ts-optchain.macro';
import Element from '../elements/Element';
import { Param } from '.';
import { Smart } from '..';

export interface FunctionDeclarationProps {
  children?: object;
  name: string;
  params?: (object | string)[];
}

export class FunctionDeclaration extends Component<FunctionDeclarationProps> {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    params: PropTypes.arrayOf(PropTypes.node)
  };

  static defaultProps = {
    children: null,
    params: []
  };

  self: Element;

  renderParams() {
    return oc(this.props)
      .params([])
      .map((param: object | string, i: number) => {
        if (typeof param === 'string') {
          return <Param key={`${i}${param}`}>{param}</Param>;
        }
        return param;
      });
  }

  render() {
    const code = `function ${this.props.name}() {}`;
    return (
      <Smart code={code}>
        <>{this.renderParams()}</>
        {this.props.children}
      </Smart>
    );
  }
}
