import _get from "lodash.get";
import { flattenPath } from "~/util";
import BaseElement from "./BaseElement";

export default class Ast extends BaseElement {
  static defaultProps: Partial<JSX.IntrinsicElements["Ast"]> = {
    bodyPath: "body",
    scopePath: "",
  };

  constructor(props: JSX.IntrinsicElements["Ast"]) {
    const baseNode = props.ast;
    const scopePath = flattenPath(props.scopePath);
    super(
      props.scopePath && scopePath.length
        ? _get(baseNode, scopePath)
        : baseNode,
      props,
      {
        bodyPath: props.bodyPath || "body",
        parentBodyPath: props.parentBodyPath,
      },
    );
  }
}
