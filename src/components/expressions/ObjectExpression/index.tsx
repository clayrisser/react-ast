/**
 * File: /src/components/expressions/ObjectExpression/index.tsx
 * Project: react-ast
 * File Created: 13-12-2023 09:57:47
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
import BaseElement from "../../../elements/BaseElement";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";
import { Smart } from "../../index";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";

export interface ObjectExpressionProps {
  children?: ReactNode;
  debug?: boolean;
}

const ObjectExpression = forwardRef<BaseElement, ObjectExpressionProps>(
  (props: ObjectExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `var a = {}`;

    function renderProperties() {
      if (children) return children;
      return;
    }

    return (
      <Smart code={code} scopePath="declarations.0.init" ref={mergedRef}>
        <ParentBodyPathProvider value="properties">
          {renderProperties()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

export default ObjectExpression;
