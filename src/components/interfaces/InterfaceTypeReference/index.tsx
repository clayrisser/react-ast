/**
 * File: /src/components/interfaces/InterfaceTypeReference/index.tsx
 * Project: react-ast
 * File Created: 23-12-2023 15:42:44
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

import BaseElement from "../../../elements/BaseElement";
import React, { Ref, forwardRef } from "react";
import Smart from "../../Smart";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";

export interface InterfaceTypeReferenceProps {
  children: string;
  debug?: boolean;
}

const InterfaceTypeReference = forwardRef<
  BaseElement,
  InterfaceTypeReferenceProps
>((props: InterfaceTypeReferenceProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = `interface A extends B<${children}> {}`;

  return (
    <ParentBodyPathProvider value="typeParameters.params">
      <Smart
        scopePath="extends.0.typeParameters.params.0"
        code={code}
        ref={mergedRef}
      />
    </ParentBodyPathProvider>
  );
});

InterfaceTypeReference.defaultProps = { debug: false };

export default InterfaceTypeReference;
