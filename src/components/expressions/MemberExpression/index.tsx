import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import BaseElement from "~/elements/BaseElement";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface MemberExpressionProps {
  children: ReactNode;
  debug?: boolean;
  name: string;
}

const MemberExpression = forwardRef<BaseElement, MemberExpressionProps>(
  (props: MemberExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, children, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `a.${name}`;

    return (
      <Smart
        bodyPath="object"
        deletePaths={typeof children === "undefined" ? "object" : undefined}
        code={code}
        ref={mergedRef}
        scopePath="expression"
      >
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

MemberExpression.defaultProps = {
  debug: false,
};

export default MemberExpression;
