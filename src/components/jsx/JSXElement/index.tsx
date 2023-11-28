/**
 * File: /src/components/jsx/JSXElement/index.tsx
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

import JSXClosingElement from "../../../components/jsx/JSXClosingElement";
import JSXOpeningElement from "../../../components/jsx/JSXOpeningElement";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import React, { forwardRef } from "react";
import Smart from "../../../components/Smart";
import type BaseElement from "../../../elements/BaseElement";
import type { JSXOpeningElementProps } from "../../../components/jsx/JSXOpeningElement";
import type { Ref, ReactNode } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface JSXElementProps extends JSXOpeningElementProps {
  children?: ReactNode;
}

const JSXElement = forwardRef<BaseElement, JSXElementProps>(
  (props: JSXElementProps, forwardedRef: Ref<BaseElement>) => {
    const { attributes, selfClosing, children, debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `<${typeof name === "undefined" ? "" : "E"}${
      children || !name ? `></${typeof name === "undefined" ? "" : "E"}` : " /"
    }>`;

    function renderOpeningElement() {
      return (
        <ParentBodyPathProvider value="openingElement">
          <JSXOpeningElement
            attributes={attributes}
            name={name}
            selfClosing={!children && selfClosing}
          />
        </ParentBodyPathProvider>
      );
    }

    function renderClosingElement() {
      return (
        <ParentBodyPathProvider value="closingElement">
          <JSXClosingElement name={name} />
        </ParentBodyPathProvider>
      );
    }

    function renderChildren() {
      return children;
    }

    return (
      <Smart
        code={code}
        scopePath="expression"
        bodyPath="children"
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {renderOpeningElement()}
          {renderClosingElement()}
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

JSXElement.defaultProps = {
  debug: false,
  selfClosing: true,
};

export default JSXElement;
