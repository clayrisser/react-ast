import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import TypeAnnotation from "~/components/types/TypeAnnotation";
import { debugRef } from "~/util";

export interface VariableDeclaratorProps {
  debug?: boolean;
  id: string;
  children?: ReactNode;
  typeAnnotation?: ReactNode;
}

const VariableDeclarator = forwardRef<BaseElement, VariableDeclaratorProps>(
  (props: VariableDeclaratorProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, id, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const isComponent = (() => {
      if (typeof children === "undefined") return false;
      const childrenKeys = new Set(Object.keys(children || {}));
      return (
        childrenKeys.has("$$typeof") &&
        childrenKeys.has("key") &&
        childrenKeys.has("props") &&
        childrenKeys.has("ref") &&
        childrenKeys.has("type")
      );
    })();
    const code = `var ${id}${typeAnnotation ? ": T" : ""}${
      typeof children !== "undefined" && !isComponent
        ? ` = ${JSON.stringify(children)}`
        : ""
    }`;

    function renderChildren() {
      if (!isComponent || typeof children === "undefined") return null;
      return (
        <ParentBodyPathProvider value="init">{children}</ParentBodyPathProvider>
      );
    }

    function renderTypeAnnotation() {
      if (!typeAnnotation) return null;
      return (
        <ParentBodyPathProvider value="id.typeAnnotation">
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
      <Smart code={code} ref={mergedRef} scopePath="declarations.0">
        {renderTypeAnnotation()}
        {renderChildren()}
      </Smart>
    );
  },
);

VariableDeclarator.defaultProps = { debug: false };

export default VariableDeclarator;
