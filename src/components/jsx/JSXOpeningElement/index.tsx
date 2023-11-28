/**
 * File: /src/components/jsx/JSXOpeningElement/index.tsx
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

import JSXAttribute from "../../../components/jsx/JSXAttribute";
import ParentBodyPathProvider from "../../../providers/ParentBodyPathProvider";
import React, { forwardRef } from "react";
import Smart from "../../../components/Smart";
import type BaseElement from "../../../elements/BaseElement";
import type { Ref, ReactNode } from "react";
import useMergedRef from "@react-hook/merged-ref";
import { debugRef } from "../../../util";

export interface JSXOpeningElementProps {
  attributes?: ReactNode;
  debug?: boolean;
  name?: string;
  selfClosing?: boolean;
}

const JSXOpeningElement = forwardRef<BaseElement, JSXOpeningElementProps>(
  (props: JSXOpeningElementProps, forwardedRef: Ref<BaseElement>) => {
    const { attributes, debug, name, selfClosing } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `<${typeof name === "undefined" ? "" : name}${
      typeof name !== "undefined" && selfClosing
        ? " /"
        : `></${typeof name === "undefined" ? "" : name}`
    }>`;

    function isComponent(value: ReactNode) {
      if (typeof value === "undefined") return false;
      const childrenKeys = new Set(Object.keys(value || {}));
      return (
        childrenKeys.has("$$typeof") &&
        childrenKeys.has("key") &&
        childrenKeys.has("props") &&
        childrenKeys.has("ref") &&
        childrenKeys.has("type")
      );
    }

    function renderAttribute(attribute: ReactNode, name?: string) {
      if (name) {
        return (
          <JSXAttribute name={name}>
            {attribute === true ? undefined : attribute}
          </JSXAttribute>
        );
      }
      if (typeof attribute === "string") {
        return <JSXAttribute name={attribute} />;
      }
      if (isComponent(attribute)) return attribute;
      return null;
    }

    function renderAttributes() {
      if (!attributes) return null;
      if (typeof attributes === "string") {
        return <JSXAttribute name={attributes} />;
      }
      if (isComponent(attributes)) return attributes;
      if (Array.isArray(attributes)) {
        return attributes.map((attribute: ReactNode) =>
          renderAttribute(attribute),
        );
      }
      if (typeof attributes === "object") {
        return Object.entries(attributes).map(([name, attribute]) =>
          renderAttribute(attribute, name),
        );
      }
      return null;
    }

    return (
      <Smart
        code={code}
        ref={mergedRef}
        bodyPath="attributes"
        scopePath="expression.openingElement"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderAttributes()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

JSXOpeningElement.defaultProps = {
  debug: false,
  selfClosing: false,
};

export default JSXOpeningElement;
