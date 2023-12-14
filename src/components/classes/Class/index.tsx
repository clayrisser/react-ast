/**
 * File: /src/components/classes/Class/index.tsx
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

import ClassDeclaration from "../../../components/classes/ClassDeclaration";
import React, { forwardRef } from "react";
import type BaseElement from "../../../elements/BaseElement";
import type { Ref, ReactNode } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";
import type { ClassDeclarationProps } from "../../../components/classes/ClassDeclaration";

export interface ClassProps
  extends Omit<
    ClassDeclarationProps,
    "superClass" | "superTypeParameters" | "name"
  > {
  extends?: ReactNode;
  extendsTypeParameters?: ReactNode;
  name: string;
}

const Class = forwardRef<BaseElement, ClassProps>(
  (props: ClassProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps: Partial<ClassProps> = { ...props };
    delete clonedProps.debug;
    delete clonedProps.extends;
    delete clonedProps.extendsTypeParameters;
    delete (clonedProps as any).name;
    const { debug, extendsTypeParameters, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return (
      <ClassDeclaration
        {...clonedProps}
        name={name}
        ref={mergedRef}
        superClass={props.extends}
        superTypeParameters={extendsTypeParameters}
      />
    );
  },
);

Class.defaultProps = {
  debug: false,
};

export default Class;
