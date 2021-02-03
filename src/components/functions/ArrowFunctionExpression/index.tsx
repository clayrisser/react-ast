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

export interface ArrowFunctionExpressionProps {
  children?: ReactNode;
  debug?: boolean;
  params?: ReactNode[];
  returnType?: ReactNode;
}

const ArrowFunctionExpression = forwardRef<
  BaseElement,
  ArrowFunctionExpressionProps
>((props: ArrowFunctionExpressionProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug, returnType, params } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = `()${returnType ? ': T' : ''} => {}`;

  function renderChildren() {
    if (typeof children === 'string') {
      return <Code>{children}</Code>;
    }
    return children;
  }

  function renderReturnType() {
    if (!returnType) return null;
    return (
      <ParentBodyPathProvider value="returnType">
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
      <ParentBodyPathProvider value="params">
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
    <Smart
      code={code}
      deletePaths="body.body"
      ref={mergedRef}
      scopePath="expression"
    >
      <ParentBodyPathProvider value={undefined}>
        {renderReturnType()}
        {renderParams()}
        <BlockStatement>{renderChildren()}</BlockStatement>
      </ParentBodyPathProvider>
    </Smart>
  );
});

ArrowFunctionExpression.defaultProps = {
  debug: false
};

export default ArrowFunctionExpression;
