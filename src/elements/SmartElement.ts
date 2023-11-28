import _get from "lodash.get";
import _merge from "lodash.merge";
import { ParserOptions } from "@babel/parser";
import template, {
  TemplateBuilderOptions,
  PublicReplacements,
} from "@babel/template";
import { flattenPath, deletePath } from "~/util";
import { Path } from "~/types";
import BaseElement from "./BaseElement";

export default class SmartElement extends BaseElement {
  static defaultProps: Partial<JSX.IntrinsicElements["SmartElement"]> = {
    bodyPath: "body",
    children: null,
    deletePaths: [],
    options: {},
    ref: (f: any) => f,
    replacements: {},
    scopePath: "",
  };

  constructor(
    props: JSX.IntrinsicElements["SmartElement"],
    parserOptions: ParserOptions = {},
  ) {
    const baseNode = template.smart(
      props.code,
      _merge(parserOptions, props.options) as TemplateBuilderOptions,
    )(props.replacements as PublicReplacements);
    const scopePath = flattenPath(props.scopePath);
    const node =
      props.scopePath && scopePath.length
        ? _get(baseNode, scopePath)
        : baseNode;
    const deletePaths = Array.isArray(props.deletePaths || [])
      ? ((props.deletePaths || []) as Path[])
      : [props.deletePaths!];
    deletePaths.forEach((path: Path) => deletePath(node, path));
    super(node, props, {
      bodyPath: props.bodyPath || "body",
      parentBodyPath: props.parentBodyPath,
    });
  }
}
