/**
 * File: /src/components/jsx/Jsx/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 05:06:26
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

import JsxElement from "../JsxElement";
import React, { forwardRef } from "react";
import type BaseElement from "../../../elements/BaseElement";
import type { JsxElementProps } from "../JsxElement";
import type { Ref } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface JsxProps extends JsxElementProps {}

const Jsx = forwardRef<BaseElement, JsxProps>(
  (props: JsxProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.debug;
    const { debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return <JsxElement {...clonedProps} ref={mergedRef} />;
  },
);

Jsx.defaultProps = {
  debug: false,
};

export default Jsx;
