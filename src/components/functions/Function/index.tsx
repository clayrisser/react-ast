/**
 * File: /src/components/functions/Function/index.tsx
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

import ArrowFunctionExpression from "../../../components/functions/ArrowFunctionExpression";
import FunctionDeclaration from "../../../components/functions/FunctionDeclaration";
import React, { forwardRef } from "react";
import type BaseElement from "../../../elements/BaseElement";
import type { FunctionDeclarationProps } from "../../../components/functions/FunctionDeclaration";
import type { Ref } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface FunctionProps extends Omit<FunctionDeclarationProps, "id"> {
  name?: string;
  arrow?: boolean;
}

const Function = forwardRef<BaseElement, FunctionProps>(
  (props: FunctionProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.name;
    const { arrow, debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    if (arrow) {
      return <ArrowFunctionExpression {...clonedProps} ref={mergedRef} />;
    }
    return <FunctionDeclaration {...clonedProps} id={name} ref={mergedRef} />;
  },
);

Function.defaultProps = {
  arrow: false,
  debug: false,
};

export default Function;
