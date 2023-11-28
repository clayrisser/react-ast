/**
 * File: /src/components/types/TypeParameterDeclaration/index.tsx
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
import TypeReference from "../../types/TypeReference";
import { debugRef } from "../../../util";

export interface TypeParameterDeclarationProps {
  children: ReactNode;
  debug?: boolean;
}

const TypeParameterDeclaration = forwardRef<
  BaseElement,
  TypeParameterDeclarationProps
>((props: TypeParameterDeclarationProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = "class C<T> {}";

  function renderChildren() {
    if (typeof children === "string") {
      return <TypeReference name={children} />;
    }
    return children;
  }

  return (
    <Smart
      bodyPath="params"
      code={code}
      deletePaths="params.0"
      ref={mergedRef}
      scopePath="typeParameters"
    >
      <ParentBodyPathProvider value={undefined}>
        {renderChildren()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

TypeParameterDeclaration.defaultProps = { debug: false };

export default TypeParameterDeclaration;
