import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import { Smart } from '~/index';
import { debugRef } from '~/util';

export interface BlockStatementProps {
  children?: ReactNode;
  debug?: boolean;
}

const BlockStatement = forwardRef<BaseElement, BlockStatementProps>(
  (props: BlockStatementProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = '{}';
    return (
      <Smart code={code} ref={mergedRef}>
        {children}
      </Smart>
    );
  }
);

BlockStatement.defaultProps = { debug: false };

export default BlockStatement;
