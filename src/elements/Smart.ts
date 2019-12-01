import PropTypes from 'prop-types';
import _ from 'lodash';
import { ParserOptions } from '@babel/parser';
import template, {
  TemplateBuilderOptions,
  PublicReplacements
} from '@babel/template';
import Element from './Element';
import { Props } from '../types';
import { flattenPath } from '../util';

export default class Smart extends Element {
  static propTypes = {
    bodyPath: PropTypes.any,
    children: PropTypes.node,
    code: PropTypes.string.isRequired,
    options: PropTypes.object,
    ref: PropTypes.func,
    parantBodyPath: PropTypes.string,
    replacements: PropTypes.object,
    scopePath: PropTypes.any
  };

  static defaultProps = {
    bodyPath: 'body.body',
    children: null,
    options: {},
    parentBodyPath: null,
    ref: (f: any) => f,
    replacements: {},
    scopePath: ''
  };

  constructor(props: Props, parserOptions: ParserOptions = {}) {
    const baseNode = template.smart(
      props.code,
      _.merge(parserOptions, props.options) as TemplateBuilderOptions
    )(props.replacements as PublicReplacements);
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
