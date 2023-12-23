/**
 * File: /src/components/interfaces/ExpressionWithTypeArguments/index.tsx
 * Project: react-ast
 * File Created: 23-12-2023 15:41:44
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
import React, { ReactNode, Ref, forwardRef } from "react";
import Smart from "../../../components/Smart";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface ExpressionWithTypeArgumentsProps {
  children?: ReactNode;
  debug?: boolean;
  name: string;
}

const ExpressionWithTypeArguments = forwardRef<
  BaseElement,
  ExpressionWithTypeArgumentsProps
>((props: ExpressionWithTypeArgumentsProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug, name } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = `interface A extends ${name}<C> {}`;

  return (
    <Smart
      scopePath="extends.0"
      bodyPath="typeParameters.params"
      deletePaths="typeParameters.params.0"
      code={code}
      ref={mergedRef}
    >
      {children}
    </Smart>
  );
});

ExpressionWithTypeArguments.defaultProps = { debug: false };

export default ExpressionWithTypeArguments;
