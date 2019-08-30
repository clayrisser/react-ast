import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Element from '../elements/Element';
import { Smart } from '..';
import { oc } from 'ts-optchain.macro';

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

  render() {
    const code = `function ${this.props.name}(${oc(this.props)
      .params([])
      .join(', ')}) {}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
