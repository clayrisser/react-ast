import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface ClassProps {
  children?: object;
  identifierName: string;
  superClassName?: string;
}

export class ClassDeclaration extends Component<ClassProps> {
  static propTypes = {
    children: PropTypes.node,
    identifierName: PropTypes.string.isRequired,
    superClassName: PropTypes.string
  };

  static defaultProps = {
    children: null,
    superClassName: null
  };

  render() {
    const code = `class ${this.props.identifierName} ${
      this.props.superClassName ? `extends ${this.props.superClassName} ` : ''
    }{}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
