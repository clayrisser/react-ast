/**
 * File: /src/components/modules/Import/index.tsx
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
import { debugRef } from "../../../util";
import type { ImportDeclarationProps } from "../ImportDeclaration";
import ImportDeclaration from "../ImportDeclaration";

export interface ImportProps
  extends Omit<
    ImportDeclarationProps,
    "defaultSpecifier" | "source" | "specifiers" | "namespaceSpecifier"
  > {
  default?: string;
  from?: string;
  imports?: ReactNode;
  namespace?: string;
}

const Import = forwardRef<BaseElement, ImportProps>(
  (props: ImportProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.debug;
    delete clonedProps.default;
    delete clonedProps.from;
    delete clonedProps.imports;
    delete clonedProps.namespace;
    const { debug, namespace, imports } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return (
      <ImportDeclaration
        {...clonedProps}
        defaultSpecifier={props.default}
        namespaceSpecifier={namespace}
        ref={mergedRef}
        source={props.from}
        specifiers={imports}
      />
    );
  },
);

Import.defaultProps = {
  debug: false,
};

export default Import;
