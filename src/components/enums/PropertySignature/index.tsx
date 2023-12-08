/**
 * File: /src/components/enums/PropertySignature/index.tsx
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
import Smart from "../../../components/Smart";
import { debugRef } from "../../../util";

export interface PropertySignatureProps {
  debug?: boolean;
  id: string;
  value?: string | number | boolean | null | undefined;
}

const PropertySignature = forwardRef<BaseElement, PropertySignatureProps>(
  (props: PropertySignatureProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, id } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `enum E {
  ${id} = ${props.value},
}`;

    function renderTypeAnnotation() {
      return null;
    }

    return (
      <Smart scopePath="body.body.0" code={code} ref={mergedRef}>
        {renderTypeAnnotation()}
      </Smart>
    );
  },
);

PropertySignature.defaultProps = { debug: false };

export default PropertySignature;