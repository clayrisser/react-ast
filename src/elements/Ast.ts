/*
 *  File: /src/elements/Ast.ts
 *  Project: react-ast
 *  File Created: 28-11-2023 15:06:23
 *  Author: Clay Risser
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
import { flattenPath } from "../util";
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
