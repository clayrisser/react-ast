import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import JSXAttribute from "~/components/jsx/JSXAttribute";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

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
