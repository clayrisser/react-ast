import React, { Ref, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import JSXElement, { JSXElementProps } from "~/components/jsx/JSXElement";
import { debugRef } from "~/util";

export interface JSXProps extends JSXElementProps {}

const JSX = forwardRef<BaseElement, JSXProps>(
  (props: JSXProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.debug;
    const { debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return <JSXElement {...clonedProps} ref={mergedRef} />;
  },
);

JSX.defaultProps = {
  debug: false,
};

export default JSX;
