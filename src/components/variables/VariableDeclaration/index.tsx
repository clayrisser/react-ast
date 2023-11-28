/**
 * File: /src/components/variables/VariableDeclaration/index.tsx
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
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import Smart from "../../Smart";
import { debugRef } from "../../../util";

export interface VariableDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  kind?: VariableDeclarationKind;
}

const VariableDeclaration = forwardRef<BaseElement, VariableDeclarationProps>(
  (props: VariableDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, kind } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `${kind} v = 0`;
    return (
      <Smart
        code={code}
        deletePaths="declarations.0"
        bodyPath="declarations"
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

export enum VariableDeclarationKind {
  Const = "const",
  Let = "let",
  Var = "var",
}

VariableDeclaration.defaultProps = {
  debug: false,
  kind: VariableDeclarationKind.Var,
};

export default VariableDeclaration;
