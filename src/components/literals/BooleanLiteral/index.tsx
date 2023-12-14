/**
 * File: /src/components/literals/BooleanLiteral/index.tsx
 * Project: react-ast
 * File Created: 14-12-2023 12:02:52
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

import React, { forwardRef, Ref } from "react";
import BaseElement from "../../../elements/BaseElement";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";
import Smart from "../../Smart";

export interface BooleanLiteralProps {
  children?: boolean;
  debug?: boolean;
}

const BooleanLiteral = forwardRef<BaseElement, BooleanLiteralProps>(
  (props: BooleanLiteralProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    const code = `var a = ${children}`;

    return (
      <Smart scopePath="declarations.0.init" code={code} ref={mergedRef} />
    );
  },
);

export default BooleanLiteral;
