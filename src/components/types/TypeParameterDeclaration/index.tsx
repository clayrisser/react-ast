import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import TypeReference from "~/components/types/TypeReference";
import { debugRef } from "~/util";

export interface TypeParameterDeclarationProps {
  children: ReactNode;
  debug?: boolean;
}

const TypeParameterDeclaration = forwardRef<
  BaseElement,
  TypeParameterDeclarationProps
>((props: TypeParameterDeclarationProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = "class C<T> {}";

  function renderChildren() {
    if (typeof children === "string") {
      return <TypeReference name={children} />;
    }
    return children;
  }

  return (
    <Smart
      bodyPath="params"
      code={code}
      deletePaths="params.0"
      ref={mergedRef}
      scopePath="typeParameters"
    >
      <ParentBodyPathProvider value={undefined}>
        {renderChildren()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

TypeParameterDeclaration.defaultProps = { debug: false };

export default TypeParameterDeclaration;
