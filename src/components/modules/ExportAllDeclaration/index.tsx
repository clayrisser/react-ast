import React, { Ref, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface ExportAllDeclarationProps {
  debug?: boolean;
  source: string;
}

const ExportAllDeclaration = forwardRef<BaseElement, ExportAllDeclarationProps>(
  (props: ExportAllDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, source } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `export * from '${source}'`;

    return <Smart code={code} ref={mergedRef} />;
  },
);

ExportAllDeclaration.defaultProps = {
  debug: false,
};

export default ExportAllDeclaration;
