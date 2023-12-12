/**
 * File: /src/components/enum/EnumMember/index.tsx
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

import React, { ReactNode, Ref, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "../../../elements/BaseElement";
import Smart from "../../Smart";
import { debugRef } from "../../../util";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import Identifier from "../../Identifier";
import Code from "../../Code";

export interface EnumMemberProps {
  name: string;
  children?: ReactNode;
  debug?: boolean;
}

const EnumMember = forwardRef<BaseElement, EnumMemberProps>(
  (props: EnumMemberProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, name, children } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `enum E {
      ${name}${children ? `= "ONE"` : ""},
    }`;

    return (
      <Smart
        scopePath="members.0"
        deletePaths="initializer.value"
        code={code}
        ref={mergedRef}
      >
        <ParentBodyPathProvider value="initializer">
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

EnumMember.defaultProps = { debug: false };

export default EnumMember;
