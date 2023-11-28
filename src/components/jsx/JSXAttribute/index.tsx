import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import JSXExpressionContainer from "~/components/jsx/JSXExpressionContainer";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface JSXAttributeProps {
  children?: ReactNode;
  debug?: boolean;
  name: string;
}

const JSXAttribute = forwardRef<BaseElement, JSXAttributeProps>(
  (props: JSXAttributeProps, forwardedRef: Ref<BaseElement>) => {
    const { children, name, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `<J ${name}${
      typeof children === "string" ? `=${JSON.stringify(children)}` : ""
    } />`;

    function renderChildren() {
      if (
        typeof children === "undefined" ||
        typeof children === "string" ||
        children === null
      ) {
        return null;
      }
      return <JSXExpressionContainer>{children}</JSXExpressionContainer>;
    }

    return (
      <Smart
        scopePath="expression.openingElement.attributes.0"
        bodyPath="value"
        code={code}
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

JSXAttribute.defaultProps = { debug: false };

export default JSXAttribute;
