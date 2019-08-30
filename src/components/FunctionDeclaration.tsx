import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { oc } from 'ts-optchain.macro';
import Element from '../elements/Element';
import { Smart, Param, ReturnStatement } from '..';

export interface FunctionDeclarationProps {
  children?: object;
  name: string;
  params?: (object | string)[];
  returnStatement?: string | object | null;
}

export class FunctionDeclaration extends Component<FunctionDeclarationProps> {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    params: PropTypes.arrayOf(PropTypes.node),
    returnStatement: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  static defaultProps = {
    children: null,
    params: [],
    returnStatement: null
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

  renderReturnStatement() {
    const { returnStatement } = this.props;
    if (!returnStatement) return <></>;
    if (typeof returnStatement !== 'string') return returnStatement;
    return <ReturnStatement>{returnStatement}</ReturnStatement>;
  }

  render() {
    const code = `function ${this.props.name}() {}`;
    return (
      <Smart code={code}>
        {this.renderParams()}
        {this.props.children}
        {this.renderReturnStatement()}
      </Smart>
    );
  }
}
