import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import Code from "~/components/Code";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface ExportDefaultDeclarationProps {
  children: ReactNode;
  debug?: boolean;
}

const ExportDefaultDeclaration = forwardRef<
  BaseElement,
  ExportDefaultDeclarationProps
>((props: ExportDefaultDeclarationProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = "export default d";

  function renderChildren() {
    if (typeof children === "string") {
      return <Code>{children}</Code>;
    }
    return children;
  }

  return (
    <Smart
      bodyPath="declaration"
      code={code}
      deletePaths="declaration"
      ref={mergedRef}
    >
      <ParentBodyPathProvider value={undefined}>
        {renderChildren()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

ExportDefaultDeclaration.defaultProps = {
  debug: false,
};

export default ExportDefaultDeclaration;
