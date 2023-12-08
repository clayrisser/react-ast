/**
 * File: /src/components/classes/ClassMethod/index.tsx
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

import type { Ref, ReactNode } from "react";
import React, { forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import type BaseElement from "../../../elements/BaseElement";
import BlockStatement from "../../../components/BlockStatement";
import Code from "../../../components/Code";
import Identifier from "../../../components/Identifier";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import Smart from "../../../components/Smart";
import TypeAnnotation from "../../../components/types/TypeAnnotation";
import { debugRef } from "../../../util";

export interface ClassMethodProps {
  accessibility?: ClassMethodAccessibility;
  children?: ReactNode;
  debug?: boolean;
  id: string;
  params?: ReactNode[];
  returnType?: ReactNode;
  static?: boolean;
}

const ClassMethod = forwardRef<BaseElement, ClassMethodProps>(
  (props: ClassMethodProps, forwardedRef: Ref<BaseElement>) => {
    const { accessibility, children, id, debug, returnType, params } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `class C { ${accessibility ? `${accessibility} ` : ""}${
      props.static ? "static " : ""
    }${id}()${returnType ? ": T" : ""} {} }`;

    function renderChildren() {
      if (typeof children === "string") {
        return <Code>{children}</Code>;
      }
      return children;
    }

    function renderReturnType() {
      if (!returnType) return null;
      return (
        <ParentBodyPathProvider value="returnType">
          {typeof returnType === "string" ? (
            <TypeAnnotation>{returnType}</TypeAnnotation>
          ) : (
            returnType
          )}
          ;
        </ParentBodyPathProvider>
      );
    }

    function renderParams() {
      if (!params?.length) return null;
      return (
        <ParentBodyPathProvider value="params">
          {params.map((param: ReactNode) => {
            if (typeof param === "string") {
              return <Identifier key={param}>{param}</Identifier>;
            }
            return param;
          })}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        code={code}
        deletePaths="body.body"
        ref={mergedRef}
        scopePath="body.body.0"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderReturnType()}
          {renderParams()}
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

export enum ClassMethodAccessibility {
  Private = "private",
  Protected = "protected",
  Public = "public",
}

ClassMethod.defaultProps = {
  debug: false,
};

export default ClassMethod;
