import template from "@babel/template";
import BaseElement from "./BaseElement";

export default class ExpressionElement extends BaseElement {
  static defaultProps: Partial<JSX.IntrinsicElements["ExpressionElement"]> = {
    bodyPath: "",
    children: null,
    options: {},
    replacements: {},
  };

  constructor(props: JSX.IntrinsicElements["ExpressionElement"]) {
    super(
      template.expression(props.code, props.options)(props.replacements),
      props,
    );
  }
}
