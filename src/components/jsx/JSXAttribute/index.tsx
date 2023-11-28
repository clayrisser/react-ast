/**
 * File: /src/components/jsx/JSXAttribute/index.tsx
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

import JSXExpressionContainer from "../../../components/jsx/JSXExpressionContainer";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import React, { forwardRef } from "react";
import Smart from "../../../components/Smart";
import type BaseElement from "../../../elements/BaseElement";
import type { Ref, ReactNode } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface JSXAttributeProps {
  children?: ReactNode;
  debug?: boolean;
  name: string;
}

const JSXAttribute = forwardRef<BaseElement, JSXAttributeProps>(
  (props: JSXAttributeProps, forwardedRef: Ref<BaseElement>) => {
    const { children, name, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `<J ${name}${
      typeof children === "string" ? `=${JSON.stringify(children)}` : ""
    } />`;

    function renderChildren() {
      if (
        typeof children === "undefined" ||
        typeof children === "string" ||
        children === null
      ) {
        return null;
      }
      return <JSXExpressionContainer>{children}</JSXExpressionContainer>;
    }

    return (
      <Smart
        scopePath="expression.openingElement.attributes.0"
        bodyPath="value"
        code={code}
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

JSXAttribute.defaultProps = { debug: false };

export default JSXAttribute;
