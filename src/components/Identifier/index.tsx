import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import TypeAnnotation from "~/components/types/TypeAnnotation";
import BaseElement from "~/elements/BaseElement";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import { debugRef } from "~/util";

export interface IdentifierProps {
  children: string;
  debug?: boolean;
  typeAnnotation?: ReactNode;
}

const Identifier = forwardRef<BaseElement, IdentifierProps>(
  (props: IdentifierProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `var ${children}${typeAnnotation ? ": T" : ""}`;

    function renderTypeAnnotation() {
      if (!typeAnnotation) return null;
      return (
        <ParentBodyPathProvider value="typeAnnotation">
          {typeof typeAnnotation === "string" ? (
            <TypeAnnotation>{typeAnnotation}</TypeAnnotation>
          ) : (
            typeAnnotation
          )}
          ;
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart scopePath="declarations.0.id" code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {renderTypeAnnotation()}
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

Identifier.defaultProps = { debug: false };

export default Identifier;
