import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface FunctionProps {
  children?: object;
  name: string;
}

export class Function extends Component<FunctionProps> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  render() {
    const code = `function ${this.props.name}() {}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
