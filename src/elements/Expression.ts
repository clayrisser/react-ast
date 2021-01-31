import template from '@babel/template';
import BaseElement from './BaseElement';

export default class Expression extends BaseElement {
  static defaultProps: Partial<JSX.IntrinsicElements['Expression']> = {
    bodyPath: '',
    children: null,
    options: {},
    replacements: {}
  };

  constructor(props: JSX.IntrinsicElements['Expression']) {
    super(
      template.expression(props.code, props.options)(props.replacements),
      props
    );
  }
}
