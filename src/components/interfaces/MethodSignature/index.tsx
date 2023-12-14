/**
 * File: /src/components/interfaces/MethodSignature/index.tsx
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
import Identifier from "../../../components/Identifier";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import Smart from "../../../components/Smart";
import TypeAnnotation from "../../../components/types/TypeAnnotation";
import { debugRef } from "../../../util";

export interface MethodSignatureProps {
  children?: ReactNode;
  debug?: boolean;
  name: string;
  params?: ReactNode[];
  returnType?: ReactNode;
}

const MethodSignature = forwardRef<BaseElement, MethodSignatureProps>(
  (props: MethodSignatureProps, forwardedRef: Ref<BaseElement>) => {
    const { children, name, debug, returnType, params } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `interface I { ${name}()${returnType ? ": T" : ""}; }`;

    function renderChildren() {
      if (typeof children === "string") {
        return <Code>{children}</Code>;
      }
      return children;
    }

    function renderReturnType() {
      if (!returnType) return null;
      return (
        <ParentBodyPathProvider value="typeAnnotation">
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
        <ParentBodyPathProvider value="parameters">
          {params.map((param: ReactNode, i: number) => {
            if (typeof param === "string") {
              return <Identifier key={`${param}${i}`}>{param}</Identifier>;
            }
            return param;
          })}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart scopePath="body.body.0" code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {renderReturnType()}
          {renderParams()}
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

MethodSignature.defaultProps = {
  debug: false,
};

export default MethodSignature;
