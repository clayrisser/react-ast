import React, { Ref, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface ExportSpecifierProps {
  children: string;
  debug?: boolean;
  local?: string;
}

const ExportSpecifier = forwardRef<BaseElement, ExportSpecifierProps>(
  (props: ExportSpecifierProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, children, local } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `export {${children}${local ? ` as ${local}` : ""}}`;

    return <Smart scopePath="specifiers.0" code={code} ref={mergedRef} />;
  },
);

ExportSpecifier.defaultProps = {
  debug: false,
};

export default ExportSpecifier;
