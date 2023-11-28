import React, { Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import BaseElement from "~/elements/BaseElement";
import BlockStatement from "~/components/BlockStatement";
import Code from "~/components/Code";
import Identifier from "~/components/Identifier";
import ParentBodyPathProvider from "~/providers/ParentBodyPathProvider";
import Smart from "~/components/Smart";
import TypeAnnotation from "~/components/types/TypeAnnotation";
import { debugRef } from "~/util";

export interface FunctionDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  id?: string;
  async?: boolean;
  params?: ReactNode[];
  returnType?: ReactNode;
}

const FunctionDeclaration = forwardRef<BaseElement, FunctionDeclarationProps>(
  (props: FunctionDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, id, debug, returnType, params } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `var f = ${props.async ? "async" : ""} function ${id || ""}()${
      returnType ? ": T" : ""
    } {}`;

    function renderChildren() {
      if (typeof children === "string") {
        return <Code>{children}</Code>;
      }
      return children;
    }

    function renderReturnType() {
      if (!returnType) return null;
      return (
        <ParentBodyPathProvider value="returnType">
          {typeof returnType === "string" ? (
            <TypeAnnotation>{returnType}</TypeAnnotation>
          ) : (
            returnType
          )}
          ;
        </ParentBodyPathProvider>
      );
    }

    function renderParams() {
      if (!params?.length) return null;
      return (
        <ParentBodyPathProvider value="params">
          {params.map((param: ReactNode) => {
            if (typeof param === "string") {
              return <Identifier>{param}</Identifier>;
            }
            return param;
          })}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart
        code={code}
        deletePaths="body.body"
        ref={mergedRef}
        scopePath="declarations.0.init"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderReturnType()}
          {renderParams()}
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  },
);

FunctionDeclaration.defaultProps = {
  debug: false,
};

export default FunctionDeclaration;
