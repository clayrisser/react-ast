import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import BaseElement from "~/elements/BaseElement";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface ExpressionStatementProps {
  children?: ReactNode;
  debug?: boolean;
}

const ExpressionStatement = forwardRef<BaseElement, ExpressionStatementProps>(
  (props: ExpressionStatementProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, children } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `${children ? "i" : ""};`;

    return (
      <Smart
        code={code}
        ref={mergedRef}
        deletePaths="expression"
        bodyPath="expression"
      >
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

ExpressionStatement.defaultProps = {
  debug: false,
};

export default ExpressionStatement;
