import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import Code from "~/components/Code";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface BlockStatementProps {
  children?: ReactNode;
  debug?: boolean;
}

const BlockStatement = forwardRef<BaseElement, BlockStatementProps>(
  (props: BlockStatementProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = "{}";

    function renderChildren() {
      if (typeof children === "string") {
        return <Code>{children}</Code>;
      }
      return children;
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

BlockStatement.defaultProps = { debug: false };

export default BlockStatement;
