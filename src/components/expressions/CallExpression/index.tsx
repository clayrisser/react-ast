import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Identifier from "~/components/Identifier";
import BaseElement from "~/elements/BaseElement";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface CallExpressionProps {
  arguments?: ReactNode;
  children?: ReactNode;
  debug?: boolean;
  name: string;
}

const CallExpression = forwardRef<BaseElement, CallExpressionProps>(
  (props: CallExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `${typeof children === "undefined" ? "" : "a."}${name}()`;

    function renderArgument(argument: ReactNode) {
      if (typeof argument === "string") {
        return <Identifier>{argument}</Identifier>;
      }
      return argument;
    }

    function renderArguments() {
      if (!props.arguments) return null;
      return (
        <ParentBodyPathProvider value="arguments">
          {Array.isArray(props.arguments)
            ? props.arguments.map(renderArgument)
            : renderArgument(props.arguments)}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        code={code}
        ref={mergedRef}
        scopePath="expression"
        bodyPath="callee.object"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderArguments()}
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

CallExpression.defaultProps = {
  debug: false,
};

export default CallExpression;
