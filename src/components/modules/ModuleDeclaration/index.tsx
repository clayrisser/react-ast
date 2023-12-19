/**
 * File: /src/components/modules/ModuleDeclaration/index.tsx
 * Project: react-ast
 * File Created: 18-12-2023 14:31:31
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

import React, { forwardRef, Ref, ReactNode } from "react";
import BaseElement from "../../../elements/BaseElement";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";
import Smart from "../../Smart";
import Code from "../../Code";
import BlockStatement from "../../BlockStatement";

export enum DeclarationType {
  Declare = "declare",
  Namespace = "namespace",
}

export interface ModuleDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  name: string;
  declaration: DeclarationType;
}

const ModuleDeclaration = forwardRef<BaseElement, ModuleDeclarationProps>(
  (props: ModuleDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, name, declaration } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    let code = "";
    if (declaration === DeclarationType.Declare) {
      code = `declare ${name} {}`;
    } else if (declaration === DeclarationType.Namespace) {
      code = `namespace ${name} {}`;
    }

    function renderChildren() {
      if (typeof children === "string") {
        return <Code>{children}</Code>;
      }
      return children;
    }

    return (
      <Smart deletePaths="body" code={code} ref={mergedRef}>
        <BlockStatement>{renderChildren()}</BlockStatement>
      </Smart>
    );
  },
);

export default ModuleDeclaration;
