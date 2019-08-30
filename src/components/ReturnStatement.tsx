import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface ReturnStatementProps {
  children: string;
}

export class ReturnStatement extends Component<ReturnStatementProps> {
  static propTypes = {
    children: PropTypes.string.isRequired
  };

  render() {
    const code = `function f() {return ${this.props.children}}`;
    return <Smart code={code} scopePath="body.body.0" />;
  }
}
