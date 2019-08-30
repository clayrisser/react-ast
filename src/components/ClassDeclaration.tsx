import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Smart } from '..';

export interface ClassDeclarationProps {
  children?: object;
  name: string;
  superClassName?: string;
}

export class ClassDeclaration extends Component<ClassDeclarationProps> {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    superClassName: PropTypes.string
  };

  static defaultProps = {
    children: null,
    superClassName: null
  };

  render() {
    const code = `class ${this.props.name} ${
      this.props.superClassName ? `extends ${this.props.superClassName} ` : ''
    }{}`;
    return <Smart code={code}>{this.props.children}</Smart>;
  }
}
