import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface CodeProps {
  children: string;
}

export class Code extends Component<CodeProps> {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    return <Smart code={this.props.children} />;
  }
}
