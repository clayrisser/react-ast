import PropTypes from 'prop-types';
import template, {
  TemplateBuilderOptions,
  PublicReplacements
} from '@babel/template';
import Element from './Element';
import { Props } from '../types';

export default class Expression extends Element {
  static propTypes = {
    bodyPath: PropTypes.string,
    children: PropTypes.node,
    code: PropTypes.string.isRequired,
    options: PropTypes.object,
    path: PropTypes.string,
    replacements: PropTypes.object
  };

  static defaultProps = {
    bodyPath: '',
    children: null,
    options: {},
    path: '',
    replacements: {}
  };

  constructor(props: Props = {}) {
    super(
      template.expression(
        props.code,
        props.options as TemplateBuilderOptions
      )(props.replacements as PublicReplacements),
      props
    );
  }
}
