/**
 * File: /src/components/enums/Enum/index.tsx
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
import EnumDeclaration, { EnumDeclarationProps } from "../EnumDeclaration";

export interface EnumProps extends Omit<EnumDeclarationProps, "id"> {
  name: string;
}

const Enum = forwardRef<BaseElement, EnumProps>(
  (props: EnumProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps: Partial<EnumProps> = { ...props };
    delete clonedProps.debug;
    delete clonedProps.name;
    const { debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return <EnumDeclaration {...clonedProps} id={name} ref={mergedRef} />;
  },
);

Enum.defaultProps = {
  debug: false,
};

export default Enum;
