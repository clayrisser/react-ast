import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface ReturnStatementProps {
  children?: ReactNode;
  debug?: boolean;
}

const ReturnStatement = forwardRef<BaseElement, ReturnStatementProps>(
  (props: ReturnStatementProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, children } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const isComponent = (() => {
      if (typeof children === "undefined") return false;
      const childrenKeys = new Set(Object.keys(children || {}));
      return (
        childrenKeys.has("$$typeof") &&
        childrenKeys.has("key") &&
        childrenKeys.has("props") &&
        childrenKeys.has("ref") &&
        childrenKeys.has("type")
      );
    })();
    const code = `return ${
      typeof children !== "undefined" && !isComponent
        ? `${JSON.stringify(children)}`
        : ""
    }`;

    function renderChildren() {
      if (!isComponent) return null;
      return (
        <ParentBodyPathProvider value="argument">
          {children}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

ReturnStatement.defaultProps = {
  debug: false,
};

export default ReturnStatement;
