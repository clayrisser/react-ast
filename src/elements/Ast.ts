import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { Props } from '~/types';
import { flattenPath } from '~/util';
import BaseElement from './BaseElement';

export default class Ast extends BaseElement {
  static propTypes = {
    ast: PropTypes.object.isRequired,
    bodyPath: PropTypes.any,
    children: PropTypes.node,
    parentBodyPath: PropTypes.string,
    scopePath: PropTypes.any
  };

  static defaultProps = {
    bodyPath: 'body.body',
    children: null,
    parentBodyPath: null,
    scopePath: ''
  };

  constructor(props: Props) {
    const baseNode = props.ast;
    const scopePath = flattenPath(props.scopePath);
    super(
      props.scopePath && scopePath.length
        ? _get(baseNode, scopePath)
        : baseNode,
      props,
      {
        bodyPath: props.bodyPath || 'body.body',
        parentBodyPath: props.parentBodyPath
      }
    );
  }
}
