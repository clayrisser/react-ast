import PropTypes from 'prop-types';
import _ from 'lodash';
import Element from './Element';
import { Props } from '../types';
import { flattenPath } from '../util';

export default class Ast extends Element {
  static propTypes = {
    ast: PropTypes.object.isRequired,
    bodyPath: PropTypes.any,
    children: PropTypes.node,
    parantBodyPath: PropTypes.string,
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
        ? _.get(baseNode, scopePath)
        : baseNode,
      props,
      {
        bodyPath: props.bodyPath || 'body.body',
        parentBodyPath: props.parentBodyPath
      }
    );
  }
}
