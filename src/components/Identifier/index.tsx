/**
 * File: /src/components/Identifier/index.tsx
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
import TypeAnnotation from "../../components/types/TypeAnnotation";
import BaseElement from "../../elements/BaseElement";
import ParentBodyPathProvider from "../../providers/ParentBodyPathProvider";
import Smart from "../../components/Smart";
import { debugRef } from "../../util";

export interface IdentifierProps {
  children: string;
  debug?: boolean;
  typeAnnotation?: ReactNode;
}

const Identifier = forwardRef<BaseElement, IdentifierProps>(
  (props: IdentifierProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `var ${children}${typeAnnotation ? ": T" : ""}`;

    function renderTypeAnnotation() {
      if (!typeAnnotation) return null;
      return (
        <ParentBodyPathProvider value="typeAnnotation">
          {typeof typeAnnotation === "string" ? (
            <TypeAnnotation>{typeAnnotation}</TypeAnnotation>
          ) : (
            typeAnnotation
          )}
          ;
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart scopePath="declarations.0.id" code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {renderTypeAnnotation()}
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

Identifier.defaultProps = { debug: false };

export default Identifier;
