/**
 * File: /src/components/modules/ExportSpecifier/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:05:44
 * Author: Lalit rajak
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

import type { Ref } from "react";
import React, { forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import type BaseElement from "../../../elements/BaseElement";
import Smart from "../../Smart";
import { debugRef } from "../../../util";

export interface ExportSpecifierProps {
  children: string;
  debug?: boolean;
  local?: string;
}

const ExportSpecifier = forwardRef<BaseElement, ExportSpecifierProps>(
  (props: ExportSpecifierProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, children, local } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `export {${children}${local ? ` as ${local}` : ""}}`;

    return <Smart scopePath="specifiers.0" code={code} ref={mergedRef} />;
  },
);

ExportSpecifier.defaultProps = {
  debug: false,
};

export default ExportSpecifier;
