import PropTypes from 'prop-types';
import _get from 'lodash.get';
import _merge from 'lodash.merge';
import { ParserOptions } from '@babel/parser';
import template, {
  TemplateBuilderOptions,
  PublicReplacements
} from '@babel/template';
import { Props } from '~/types';
import { flattenPath } from '~/util';
import BaseElement from './BaseElement';

export default class Smart extends BaseElement {
  static propTypes = {
    bodyPath: PropTypes.any,
    children: PropTypes.node,
    code: PropTypes.string.isRequired,
    options: PropTypes.object,
    parentBodyPath: PropTypes.string,
    ref: PropTypes.func,
    replacements: PropTypes.object,
    scopePath: PropTypes.any
  };

  static defaultProps = {
    bodyPath: 'body',
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
      _merge(parserOptions, props.options) as TemplateBuilderOptions
    )(props.replacements as PublicReplacements);
    const scopePath = flattenPath(props.scopePath);
    super(
      props.scopePath && scopePath.length
        ? _get(baseNode, scopePath)
        : baseNode,
      props,
      {
        bodyPath: props.bodyPath || 'body',
        parentBodyPath: props.parentBodyPath
      }
    );
  }
}
