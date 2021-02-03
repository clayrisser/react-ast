import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import BlockStatement from '~/components/BlockStatement';
import Code from '~/components/Code';
import Identifier from '~/components/Identifier';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import TypeAnnotation from '~/components/types/TypeAnnotation';
import { debugRef } from '~/util';

export interface MethodSignatureProps {
  children?: ReactNode;
  debug?: boolean;
  id: string;
  params?: ReactNode[];
  returnType?: ReactNode;
}

const MethodSignature = forwardRef<BaseElement, MethodSignatureProps>(
  (props: MethodSignatureProps, forwardedRef: Ref<BaseElement>) => {
    const { children, id, debug, returnType, params } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `interface I { ${id}()${returnType ? ': T' : ''}; }`;

    function renderChildren() {
      if (typeof children === 'string') {
        return <Code>{children}</Code>;
      }
      return children;
    }

    function renderReturnType() {
      if (!returnType) return null;
      return (
        <ParentBodyPathProvider value="typeAnnotation">
          {typeof returnType === 'string' ? (
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
        <ParentBodyPathProvider value="parameters">
          {params.map((param: ReactNode) => {
            if (typeof param === 'string') {
              return <Identifier>{param}</Identifier>;
            }
            return param;
          })}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart scopePath="body.body.0" code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {renderReturnType()}
          {renderParams()}
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

MethodSignature.defaultProps = {
  debug: false
};

export default MethodSignature;
