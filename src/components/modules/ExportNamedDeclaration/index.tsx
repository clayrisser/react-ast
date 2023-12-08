/**
 * File: /src/components/modules/ExportNamedDeclaration/index.tsx
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
import Code from "../../Code";
import ExportSpecifier from "../ExportSpecifier";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import Smart from "../../Smart";
import { debugRef } from "../../../util";

export interface ExportNamedDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  source?: string;
  specifiers?: ReactNode;
  exportKind?: "type" | "value";
}

const ExportNamedDeclaration = forwardRef<
  BaseElement,
  ExportNamedDeclarationProps
>((props: ExportNamedDeclarationProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug, source, specifiers } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = `export ${props.exportKind === "type" ? "type" : ""} {}${
    source ? ` from '${source}'` : ""
  }`;

  function renderChildren() {
    if (typeof children === "string") {
      return <Code>{children}</Code>;
    }
    return children;
  }

  function renderSpecifier(specifier: ReactNode) {
    if (typeof specifier === "string") {
      return <ExportSpecifier>{specifier}</ExportSpecifier>;
    }
    return specifier;
  }

  function renderSpecifiers() {
    if (!specifiers) return null;
    return (
      <ParentBodyPathProvider value="specifiers">
        {Array.isArray(specifiers) ? (
          specifiers.map((specifier, index) => (
            <React.Fragment key={index}>
              {renderSpecifier(specifier)}
            </React.Fragment>
          ))
        ) : (
          <React.Fragment key={0}>{renderSpecifier(specifiers)}</React.Fragment>
        )}
      </ParentBodyPathProvider>
    );
  }

  return (
    <Smart code={code} bodyPath="declaration" ref={mergedRef}>
      <ParentBodyPathProvider value={undefined}>
        {renderSpecifiers()}
        {renderChildren()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

ExportNamedDeclaration.defaultProps = {
  debug: false,
};

export default ExportNamedDeclaration;
