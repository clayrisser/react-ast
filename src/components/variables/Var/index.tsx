import React, { Ref, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import { debugRef } from '~/util';
import VariableDeclarator, {
  VariableDeclaratorProps
} from '~/components/variables/VariableDeclarator';
import VariableDeclaration, {
  VariableDeclarationKind,
  VariableDeclarationProps
} from '~/components/variables/VariableDeclaration';

export interface VarProps
  extends Omit<VariableDeclarationProps, 'children' | 'kind'>,
    Omit<VariableDeclaratorProps, 'id'> {
  kind?: VarKind;
  name: string;
}

const Var = forwardRef<BaseElement, VarProps>(
  (props: VarProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, kind, typeAnnotation, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    return (
      <VariableDeclaration
        kind={kind as unknown as VariableDeclarationKind}
        ref={mergedRef}
      >
        <VariableDeclarator id={name} typeAnnotation={typeAnnotation}>
          {children}
        </VariableDeclarator>
      </VariableDeclaration>
    );
  }
);

export enum VarKind {
  Const = VariableDeclarationKind.Const,
  Let = VariableDeclarationKind.Let,
  Var = VariableDeclarationKind.Var
}

Var.defaultProps = {
  debug: false,
  kind: VarKind.Var
};

export default Var;
