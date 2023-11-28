/**
 * File: /src/components/expressions/CallExpression/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 02:58:22
 * Author: Clay Risser
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

import Identifier from "../../../components/Identifier";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import React, { forwardRef } from "react";
import Smart from "../../../components/Smart";
import type BaseElement from "../../../elements/BaseElement";
import type { Ref, ReactNode } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface CallExpressionProps {
  arguments?: ReactNode;
  children?: ReactNode;
  debug?: boolean;
  name: string;
}

const CallExpression = forwardRef<BaseElement, CallExpressionProps>(
  (props: CallExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `${typeof children === "undefined" ? "" : "a."}${name}()`;

    function renderArgument(argument: ReactNode) {
      if (typeof argument === "string") {
        return <Identifier>{argument}</Identifier>;
      }
      return argument;
    }

    function renderArguments() {
      if (!props.arguments) return null;
      return (
        <ParentBodyPathProvider value="arguments">
          {Array.isArray(props.arguments)
            ? props.arguments.map(renderArgument)
            : renderArgument(props.arguments)}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        code={code}
        ref={mergedRef}
        scopePath="expression"
        bodyPath="callee.object"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderArguments()}
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

CallExpression.defaultProps = {
  debug: false,
};

export default CallExpression;
