/**
 * File: /src/components/modules/Export/index.tsx
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

import type { Ref, ReactNode } from "react";
import React, { forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import type BaseElement from "../../../elements/BaseElement";
import ExportDefaultDeclaration from "../ExportDefaultDeclaration";
import { debugRef } from "../../../util";
import type { ExportNamedDeclarationProps } from "../ExportNamedDeclaration";
import ExportNamedDeclaration from "../ExportNamedDeclaration";

export interface ExportProps
  extends Omit<ExportNamedDeclarationProps, "specifiers" | "source"> {
  default?: boolean;
  exports?: ReactNode;
  from?: string;
}

const Export = forwardRef<BaseElement, ExportProps>(
  (props: ExportProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.from;
    delete clonedProps.exports;
    delete clonedProps.debug;
    const { children, exports, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    if (props.default) {
      return (
        <ExportDefaultDeclaration ref={mergedRef}>
          {children}
        </ExportDefaultDeclaration>
      );
    }
    return (
      <ExportNamedDeclaration
        {...clonedProps}
        ref={mergedRef}
        source={props.from}
        specifiers={exports}
      />
    );
  },
);

Export.defaultProps = {
  debug: false,
  default: false,
};

export default Export;
