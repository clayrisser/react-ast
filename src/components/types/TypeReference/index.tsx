/**
 * File: /src/components/types/TypeReference/index.tsx
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

export interface TypeReferenceProps {
  children?: ReactNode;
  name: string;
  debug?: boolean;
}

const TypeReference = forwardRef<BaseElement, TypeReferenceProps>(
  (props: TypeReferenceProps, forwardedRef: Ref<BaseElement>) => {
    const { children, name, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `const c: ${name}`;
    return (
      <Smart
        bodyPath="typeParameters"
        code={code}
        ref={mergedRef}
        scopePath="declarations.0.id.typeAnnotation.typeAnnotation"
      >
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

TypeReference.defaultProps = { debug: false };

export default TypeReference;
