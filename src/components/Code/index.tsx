import React, { forwardRef, Ref } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface CodeProps {
  children: string;
  debug?: boolean;
  scopePath?: string;
}

const Code = forwardRef<BaseElement, CodeProps>(
  (props: CodeProps, forwardedRef: Ref<BaseElement>) => {
    const { children, scopePath, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    return <Smart code={children} scopePath={scopePath} ref={mergedRef} />;
  },
);

Code.defaultProps = {
  debug: false,
};

export default Code;
