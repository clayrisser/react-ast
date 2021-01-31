import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface VariableDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  kind?: string;
}

const VariableDeclaration = forwardRef<BaseElement, VariableDeclarationProps>(
  (props: VariableDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, kind } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `${kind} v = 0`;
    return (
      <Smart
        code={code}
        deletePaths="declarations.0"
        bodyPath="declarations"
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

export enum VariableDeclarationKind {
  Const = 'const',
  Let = 'let',
  Var = 'var'
}

VariableDeclaration.defaultProps = {
  debug: false,
  kind: VariableDeclarationKind.Var
};

export default VariableDeclaration;
