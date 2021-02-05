import React, { Ref, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import FunctionDeclaration, {
  FunctionDeclarationProps
} from '~/components/functions/FunctionDeclaration';
import ArrowFunctionExpression from '~/components/functions/ArrowFunctionExpression';
import { debugRef } from '~/util';

export interface FunctionProps extends Omit<FunctionDeclarationProps, 'id'> {
  name?: string;
  arrow?: boolean;
}

const Function = forwardRef<BaseElement, FunctionProps>(
  (props: FunctionProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.name;
    const { arrow, debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    if (arrow) {
      return <ArrowFunctionExpression {...clonedProps} ref={mergedRef} />;
    }
    return <FunctionDeclaration {...clonedProps} id={name} ref={mergedRef} />;
  }
);

Function.defaultProps = {
  arrow: false,
  debug: false
};

export default Function;
