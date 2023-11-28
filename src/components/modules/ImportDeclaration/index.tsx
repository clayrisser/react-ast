/**
 * File: /src/components/modules/ImportDeclaration/index.tsx
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
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import ImportSpecifier from "../ImportSpecifier";
import type BaseElement from "../../../elements/BaseElement";
import Smart from "../../Smart";
import { debugRef } from "../../../util";

export interface ImportDeclarationProps {
  debug?: boolean;
  defaultSpecifier?: string;
  namespaceSpecifier?: string;
  source?: string;
  specifiers?: ReactNode;
}

const ImportDeclaration = forwardRef<BaseElement, ImportDeclarationProps>(
  (props: ImportDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, defaultSpecifier, namespaceSpecifier, source, specifiers } =
      props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `import ${
      namespaceSpecifier
        ? ` * as ${namespaceSpecifier}`
        : defaultSpecifier || "I"
    } from '${source}'`;

    function renderSpecifier(specifier: ReactNode, i?: number) {
      if (typeof specifier === "string") {
        return (
          <ImportSpecifier
            key={typeof i !== "undefined" ? i.toString() : undefined}
          >
            {specifier}
          </ImportSpecifier>
        );
      }
      return specifier;
    }

    function renderSpecifiers() {
      if (!specifiers || namespaceSpecifier) return null;
      return (
        <ParentBodyPathProvider value="specifiers">
          {Array.isArray(specifiers)
            ? specifiers.map(renderSpecifier)
            : renderSpecifier(specifiers)}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        code={code}
        deletePaths={
          defaultSpecifier || namespaceSpecifier ? undefined : "specifiers.0"
        }
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {renderSpecifiers()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

ImportDeclaration.defaultProps = {
  debug: false,
};

export default ImportDeclaration;
