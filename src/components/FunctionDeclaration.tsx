import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface FunctionProps {
  children?: object;
  identifierName: string;
}

export class FunctionDeclaration extends Component<FunctionProps> {
  static propTypes = {
    children: PropTypes.node,
    identifierName: PropTypes.string.isRequired
  };

  static defaultProps = {
    children: null
  };

  render() {
    const code = `function ${this.props.identifierName}() {}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
