import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import BlockStatement from '~/components/BlockStatement';
import Code from '~/components/Code';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import TypeAnnotation from '~/components/types/TypeAnnotation';
import { debugRef } from '~/util';

export interface FunctionDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  id: string;
  returnType?: ReactNode;
}

const FunctionDeclaration = forwardRef<BaseElement, FunctionDeclarationProps>(
  (props: FunctionDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, id, debug, returnType } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `function ${id}()${returnType ? ': T' : ''} {}`;

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

    return (
      <Smart
        bodyPath="body"
        code={code}
        deletePaths="body.body"
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {renderReturnType()}
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

FunctionDeclaration.defaultProps = {
  debug: false
};

export default FunctionDeclaration;
