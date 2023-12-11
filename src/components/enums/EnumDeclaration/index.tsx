/**
 * File: /src/components/enums/EnumDeclaration/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:04:04
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

import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "../../../elements/BaseElement";
import BlockStatement from "../../../components/BlockStatement";
import Code from "../../../components/Code";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import Smart from "../../../components/Smart";
import { debugRef } from "../../../util";

export interface EnumDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  id: string;
}

const EnumDeclaration = forwardRef<BaseElement, EnumDeclarationProps>(
  (props: EnumDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, id } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `enum ${id} {}`;

    function renderChildren() {
      if (typeof children === "string") {
        return <Code>{children}</Code>;
      }
      return children;
    }

    return (
      <Smart code={code} deletePaths="body.body" ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

EnumDeclaration.defaultProps = {
  debug: false,
};

export default EnumDeclaration;
