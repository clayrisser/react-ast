/**
 * File: /src/components/expressions/AssignmentExpression/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:04:04
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

import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import BaseElement from "../../../elements/BaseElement";
import Smart from "../../../components/Smart";
import { debugRef } from "../../../util";

export interface AssignmentExpressionProps {
  children?: ReactNode;
  debug?: boolean;
  left: ReactNode;
}

const AssignmentExpression = forwardRef<BaseElement, AssignmentExpressionProps>(
  (props: AssignmentExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, left } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const childrenIsComponent = isComponent(children);
    const leftIsComponent = isComponent(left);

    function isComponent(value: ReactNode): boolean {
      if (typeof value === "undefined") return false;
      const valueKeys = new Set(Object.keys(value || {}));
      return (
        valueKeys.has("$$typeof") &&
        valueKeys.has("key") &&
        valueKeys.has("props") &&
        valueKeys.has("ref") &&
        valueKeys.has("type")
      );
    }

    const code = `${leftIsComponent ? "l" : left} = ${
      typeof children !== "undefined" && !childrenIsComponent
        ? `${JSON.stringify(children)}`
        : "undefined"
    }`;

    function renderChildren() {
      if (!childrenIsComponent) return null;
      return children;
    }

    function renderLeft() {
      if (!leftIsComponent) return null;
      return (
        <ParentBodyPathProvider value="left">{left}</ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        bodyPath="right"
        code={code}
        deletePaths={leftIsComponent ? "left" : undefined}
        ref={mergedRef}
        scopePath="expression"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderLeft()}
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

AssignmentExpression.defaultProps = {
  debug: false,
};

export default AssignmentExpression;
