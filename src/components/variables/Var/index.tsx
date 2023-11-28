/**
 * File: /src/components/variables/Var/index.tsx
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
import { debugRef } from "../../../util";
import type { VariableDeclaratorProps } from "../../variables/VariableDeclarator";
import VariableDeclarator from "../../variables/VariableDeclarator";
import type { VariableDeclarationProps } from "../../variables/VariableDeclaration";
import VariableDeclaration, {
  VariableDeclarationKind,
} from "../../variables/VariableDeclaration";

export interface VarProps
  extends Omit<VariableDeclarationProps, "children" | "kind">,
    Omit<VariableDeclaratorProps, "id"> {
  kind?: VarKind;
  name: string;
}

const Var = forwardRef<BaseElement, VarProps>(
  (props: VarProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, kind, typeAnnotation, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    return (
      <VariableDeclaration
        kind={kind as unknown as VariableDeclarationKind}
        ref={mergedRef}
      >
        <VariableDeclarator id={name} typeAnnotation={typeAnnotation}>
          {children}
        </VariableDeclarator>
      </VariableDeclaration>
    );
  },
);

export enum VarKind {
  Const = VariableDeclarationKind.Const,
  Let = VariableDeclarationKind.Let,
  Var = VariableDeclarationKind.Var,
}

Var.defaultProps = {
  debug: false,
  kind: VarKind.Var,
};

export default Var;
