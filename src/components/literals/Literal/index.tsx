/**
 * File: /src/components/literals/Literal/index.tsx
 * Project: react-ast
 * File Created: 14-12-2023 17:54:02
 * Author: dharmendra
 * -----
 * BitSpur (c) Copyright 2019 - 2023
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { ReactNode, Ref, forwardRef } from "react";

import {
  BooleanLiteral,
  NumericLiteral,
  StringLiteral,
  ObjectLiteral,
} from "../index";
import BigIntLiteral from "../BigIntLiteral";
import BaseElement from "../../../elements/BaseElement";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface LiteralProps {
  children: ReactNode | Object;
  debug?: boolean;
}

const Literal = forwardRef<BaseElement, LiteralProps>(
  (props: LiteralProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    function getLiterals() {
      switch (typeof children) {
        case "boolean":
          return (
            <BooleanLiteral ref={mergedRef} debug={debug}>
              {children}
            </BooleanLiteral>
          );
        case "number":
          return (
            <NumericLiteral ref={mergedRef} debug={debug}>
              {children}
            </NumericLiteral>
          );
        case "string":
          return (
            <StringLiteral ref={mergedRef} debug={debug}>
              {children}
            </StringLiteral>
          );
        case "bigint":
          return (
            <BigIntLiteral ref={mergedRef} debug={debug}>
              {children}
            </BigIntLiteral>
          );
        default:
          return (
            <ObjectLiteral ref={mergedRef} debug={debug}>
              {JSON.stringify(children)}
            </ObjectLiteral>
          );
      }
    }

    return <>{getLiterals()}</>;
  },
);

export default Literal;
