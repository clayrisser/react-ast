/*
 *  File: /src/elements/SmartElement.ts
 *  Project: react-ast
 *  File Created: 28-11-2023 15:04:04
 *  Author: dharmendra
 *  -----
 *  BitSpur (c) Copyright 2019 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import _get from "lodash.get";
import _merge from "lodash.merge";
import { ParserOptions } from "@babel/parser";
import template, {
  TemplateBuilderOptions,
  PublicReplacements,
} from "@babel/template";
import { flattenPath, deletePath } from "../util";
import { Path } from "../types";
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
    parserOptions: ParserOptions = {}
  ) {
    const baseNode = template.smart(
      props.code,
      _merge(parserOptions, props.options) as TemplateBuilderOptions
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
