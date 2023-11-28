import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import BaseElement from "~/elements/BaseElement";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface AssignmentExpressionProps {
  children?: ReactNode;
  debug?: boolean;
  left: ReactNode;
}

const AssignmentExpression = forwardRef<BaseElement, AssignmentExpressionProps>(
  (props: AssignmentExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, left } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const childrenIsComponent = isComponent(children);
    const leftIsComponent = isComponent(left);

    function isComponent(value: ReactNode): boolean {
      if (typeof value === "undefined") return false;
      const valueKeys = new Set(Object.keys(value || {}));
      return (
        valueKeys.has("$$typeof") &&
        valueKeys.has("key") &&
        valueKeys.has("props") &&
        valueKeys.has("ref") &&
        valueKeys.has("type")
      );
    }

    const code = `${leftIsComponent ? "l" : left} = ${
      typeof children !== "undefined" && !childrenIsComponent
        ? `${JSON.stringify(children)}`
        : "undefined"
    }`;

    function renderChildren() {
      if (!childrenIsComponent) return null;
      return children;
    }

    function renderLeft() {
      if (!leftIsComponent) return null;
      return (
        <ParentBodyPathProvider value="left">{left}</ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        bodyPath="right"
        code={code}
        deletePaths={leftIsComponent ? "left" : undefined}
        ref={mergedRef}
        scopePath="expression"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderLeft()}
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

AssignmentExpression.defaultProps = {
  debug: false,
};

export default AssignmentExpression;
