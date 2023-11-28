import React, { Ref, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import useParentBodyPath from "~/hooks/useParentBodyPath";
import { SmartElement } from "~/index";
import { debugRef } from "~/util";

export type SmartProps = Omit<
  JSX.IntrinsicElements["SmartElement"],
  "parentBodyType"
> & { debug?: boolean };

const Smart = forwardRef<BaseElement, SmartProps>(
  (props: SmartProps, forwardedRef: Ref<BaseElement>) => {
    const { debug } = props;
    const parentBodyPath = useParentBodyPath();
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return (
      <SmartElement
        {...props}
        ref={mergedRef}
        parentBodyPath={parentBodyPath}
      />
    );
  },
);

Smart.defaultProps = { debug: false };

export default Smart;
