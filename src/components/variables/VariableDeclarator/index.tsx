/**
 * File: /src/components/variables/VariableDeclarator/index.tsx
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
import TypeAnnotation from "../../types/TypeAnnotation";
import { debugRef } from "../../../util";

export interface VariableDeclaratorProps {
  children?: any;
  debug?: boolean;
  id: string;
  typeAnnotation?: ReactNode;
}

const VariableDeclarator = forwardRef<BaseElement, VariableDeclaratorProps>(
  (props: VariableDeclaratorProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, id, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const isComponent = (() => {
      if (typeof children === "undefined") return false;
      const childrenKeys = new Set(Object.keys(children || {}));
      return (
        childrenKeys.has("$$typeof") &&
        childrenKeys.has("key") &&
        childrenKeys.has("props") &&
        childrenKeys.has("ref") &&
        childrenKeys.has("type")
      );
    })();
    const code = `var ${id}${typeAnnotation ? ": T" : ""}${
      typeof children !== "undefined" && !isComponent
        ? ` = ${JSON.stringify(children)}`
        : ""
    }`;

    function renderChildren() {
      if (!isComponent || typeof children === "undefined") return null;
      return (
        <ParentBodyPathProvider value="init">{children}</ParentBodyPathProvider>
      );
    }

    function renderTypeAnnotation() {
      if (!typeAnnotation) return null;
      return (
        <ParentBodyPathProvider value="id.typeAnnotation">
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
      <Smart code={code} ref={mergedRef} scopePath="declarations.0">
        {renderTypeAnnotation()}
        {renderChildren()}
      </Smart>
    );
  },
);

VariableDeclarator.defaultProps = { debug: false };

export default VariableDeclarator;
