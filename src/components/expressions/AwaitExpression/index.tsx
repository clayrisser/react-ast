import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface AwaitExpressionProps {
  children?: ReactNode;
  debug?: boolean;
}

const AwaitExpression = forwardRef<BaseElement, AwaitExpressionProps>(
  (props: AwaitExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `const a = await ${children} `;
    return (
      <Smart code={code} ref={mergedRef} bodyPath={'declarations.0.init'}>
        {children}
      </Smart>
    );
  }
);

AwaitExpression.defaultProps = {
  debug: false
};

export default AwaitExpression;
