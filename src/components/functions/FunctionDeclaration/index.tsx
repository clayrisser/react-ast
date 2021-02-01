import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import BlockStatement from '~/components/BlockStatement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface FunctionDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  id: string;
}

const FunctionDeclaration = forwardRef<BaseElement, FunctionDeclarationProps>(
  (props: FunctionDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, id, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `function ${id}() {}`;

    function renderChildren() {
      if (typeof children === 'string') {
        return <BlockStatement>{children}</BlockStatement>;
      }
      return children;
    }

    return (
      <Smart code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

FunctionDeclaration.defaultProps = { debug: false };

export default FunctionDeclaration;
