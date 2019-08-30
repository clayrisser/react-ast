import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface ParamProps {
  children: string;
}

export class Param extends Component<ParamProps> {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    const code = `function f(${this.props.children}) {}`;
    return <Smart code={code} scopePath="params.0" parentBodyPath="params" />;
  }
}
