import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface ClassProps {
  children?: object;
  name: string;
}

export class Class extends Component<ClassProps> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  render() {
    const code = `class ${this.props.name} {}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
