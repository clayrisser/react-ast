/**
 * File: /src/components/types/IntersectionType/index.tsx
 * Project: react-ast
 * File Created: 29-12-2023 15:28:53
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
import Smart from "../../Smart";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";

export interface IntersectionTypeProps {
  children?: ReactNode;
  debug?: boolean;
}

const IntersectionType = forwardRef<BaseElement, IntersectionTypeProps>(
  (props: IntersectionTypeProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `type E = A & B`;

    return (
      <Smart
        deletePaths={["types.1", "types.0"]}
        scopePath="typeAnnotation"
        code={code}
        ref={mergedRef}
      >
        <ParentBodyPathProvider value="types">
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

export default IntersectionType;
