/**
 * File: /src/components/expressions/Property/index.tsx
 * Project: react-ast
 * File Created: 13-12-2023 10:20:02
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

import React, { forwardRef, Ref, ReactNode } from "react";
import BaseElement from "../../../elements/BaseElement";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";
import { Smart } from "../../../index";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";

export interface PropertyProps {
  name: ReactNode;
  children?: ReactNode;
  debug?: boolean;
}

const Property = forwardRef<BaseElement, PropertyProps>(
  (props: PropertyProps, forwardedRef: Ref<BaseElement>) => {
    const { name, children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `var a = { a ${children ? `: 1` : ""}}`;

    function renderName() {
      if (!name) return null;
      return (
        <ParentBodyPathProvider value="key">{name}</ParentBodyPathProvider>
      );
    }

    function renderChildren() {
      if (!children) return null;
      return (
        <ParentBodyPathProvider value="value">
          {children}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        code={code}
        scopePath="declarations.0.init.properties.0"
        deletePaths={[
          "declarations.0.init.properties.0.value",
          "declarations.0.init.properties.0.key",
        ]}
        ref={mergedRef}
      >
        {renderName()}
        {renderChildren()}
      </Smart>
    );
  },
);

export default Property;
