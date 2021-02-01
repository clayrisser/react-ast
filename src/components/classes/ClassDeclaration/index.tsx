import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import BlockStatement from '~/components/BlockStatement';
import Code from '~/components/Code';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface ClassDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  id: string;
  kind?: string;
}

const ClassDeclaration = forwardRef<BaseElement, ClassDeclarationProps>(
  (props: ClassDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, id } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `class ${id} {}`;

    function renderChildren() {
      if (typeof children === 'string') {
        return <Code>{children}</Code>;
      }
      return children;
    }

    return (
      <Smart code={code} deletePaths="body.body" ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          <BlockStatement>{renderChildren()}</BlockStatement>
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

ClassDeclaration.defaultProps = {
  debug: false
};

export default ClassDeclaration;
