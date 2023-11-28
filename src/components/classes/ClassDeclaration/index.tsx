/**
 * File: /src/components/classes/ClassDeclaration/index.tsx
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

import BlockStatement from "../../../components/BlockStatement";
import Code from "../../../components/Code";
import Identifier from "../../../components/Identifier";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import React, { forwardRef } from "react";
import Smart from "../../../components/Smart";
import TypeParameterDeclaration from "../../../components/types/TypeParameterDeclaration";
import TypeReference from "../../../components/types/TypeReference";
import type BaseElement from "../../../elements/BaseElement";
import type { Ref, ReactNode } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface ClassDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  id: string;
  superClass?: ReactNode;
  superTypeParameters?: ReactNode;
  typeParameters?: ReactNode;
}

const ClassDeclaration = forwardRef<BaseElement, ClassDeclarationProps>(
  (props: ClassDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const {
      children,
      debug,
      id,
      superClass,
      superTypeParameters,
      typeParameters,
    } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `class ${id} {}`;

    function renderSuperClass() {
      return (
        <ParentBodyPathProvider value="superClass">
          {typeof superClass === "string" ? (
            <Identifier>{superClass}</Identifier>
          ) : (
            superClass
          )}
        </ParentBodyPathProvider>
      );
    }

    function renderTypeParameter(typeParameter: ReactNode) {
      return typeof typeParameter === "string" ? (
        <TypeReference name={typeParameter} />
      ) : (
        typeParameter
      );
    }

    function renderTypeParameters() {
      if (!typeParameters) return null;
      return (
        <ParentBodyPathProvider value="typeParameters">
          <TypeParameterDeclaration>
            {Array.isArray(typeParameters)
              ? typeParameters.map(renderTypeParameter)
              : renderTypeParameter(typeParameters)}
          </TypeParameterDeclaration>
        </ParentBodyPathProvider>
      );
    }

    function renderSuperTypeParameters() {
      if (!superTypeParameters) return null;
      return (
        <ParentBodyPathProvider value="superTypeParameters">
          <TypeParameterDeclaration>
            {Array.isArray(superTypeParameters)
              ? superTypeParameters.map(renderTypeParameter)
              : renderTypeParameter(superTypeParameters)}
          </TypeParameterDeclaration>
        </ParentBodyPathProvider>
      );
    }

    function renderChildren() {
      if (typeof children === "string") {
        return <Code>{children}</Code>;
      }
      return children;
    }

    return (
      <Smart code={code} deletePaths="body.body" ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {renderSuperClass()}
          {renderSuperTypeParameters()}
          {renderTypeParameters()}
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

ClassDeclaration.defaultProps = {
  debug: false,
};

export default ClassDeclaration;
