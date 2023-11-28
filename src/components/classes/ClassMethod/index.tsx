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

export interface ClassMethodProps {
  accessibility?: ClassMethodAccessibility;
  children?: ReactNode;
  debug?: boolean;
  id: string;
  params?: ReactNode[];
  returnType?: ReactNode;
  static?: boolean;
}

const ClassMethod = forwardRef<BaseElement, ClassMethodProps>(
  (props: ClassMethodProps, forwardedRef: Ref<BaseElement>) => {
    const { accessibility, children, id, debug, returnType, params } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `class C { ${accessibility ? `${accessibility} ` : ""}${
      props.static ? "static " : ""
    }${id}()${returnType ? ": T" : ""} {} }`;

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
        scopePath="body.body.0"
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

export enum ClassMethodAccessibility {
  Private = "private",
  Protected = "protected",
  Public = "public",
}

ClassMethod.defaultProps = {
  debug: false,
};

export default ClassMethod;
