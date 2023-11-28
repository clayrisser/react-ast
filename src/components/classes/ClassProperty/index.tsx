/**
 * File: /src/components/classes/ClassProperty/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 02:58:22
 * Author: Clay Risser
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

import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import React, { forwardRef } from "react";
import Smart from "../../../components/Smart";
import TypeAnnotation from "../../../components/types/TypeAnnotation";
import type BaseElement from "../../../elements/BaseElement";
import type { Ref, ReactNode } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface ClassPropertyProps {
  accessibility?: ClassPropertyAccessibility;
  children?: any;
  debug?: boolean;
  id: string;
  static?: boolean;
  typeAnnotation?: ReactNode;
}

const ClassProperty = forwardRef<BaseElement, ClassPropertyProps>(
  (props: ClassPropertyProps, forwardedRef: Ref<BaseElement>) => {
    const { accessibility, children, debug, id, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `class C {
  ${accessibility ? `${accessibility} ` : ""}${
    props.static ? "static " : ""
  }${id}${typeAnnotation ? ": T" : ""}${
    typeof children !== "undefined" ? ` = ${JSON.stringify(children)}` : ""
  }
}`;

    function renderTypeAnnotation() {
      if (!typeAnnotation) return null;
      return (
        <ParentBodyPathProvider value="typeAnnotation">
          {typeof typeAnnotation === "string" ? (
            <TypeAnnotation>{typeAnnotation}</TypeAnnotation>
          ) : (
            typeAnnotation
          )}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart scopePath="body.body.0" code={code} ref={mergedRef}>
        {renderTypeAnnotation()}
      </Smart>
    );
  },
);

export enum ClassPropertyAccessibility {
  Private = "private",
  Protected = "protected",
  Public = "public",
}

ClassProperty.defaultProps = { debug: false };

export default ClassProperty;
