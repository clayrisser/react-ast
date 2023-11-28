/**
 * File: /src/components/interfaces/Interface/index.tsx
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

import React, { Ref, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "../../../elements/BaseElement";
import { debugRef } from "../../../util";
import InterfaceDeclaration, {
  InterfaceDeclarationProps,
} from "../../../components/interfaces/InterfaceDeclaration";

export interface InterfaceProps extends Omit<InterfaceDeclarationProps, "id"> {
  name: string;
}

const Interface = forwardRef<BaseElement, InterfaceProps>(
  (props: InterfaceProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps: Partial<InterfaceProps> = { ...props };
    delete clonedProps.debug;
    delete clonedProps.name;
    const { debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return <InterfaceDeclaration {...clonedProps} id={name} ref={mergedRef} />;
  }
);

Interface.defaultProps = {
  debug: false,
};

export default Interface;
