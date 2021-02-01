import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface ReturnStatementProps {
  children?: ReactNode;
  debug?: boolean;
}

const ReturnStatement = forwardRef<BaseElement, ReturnStatementProps>(
  (props: ReturnStatementProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, children } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `return ${JSON.stringify(children)}`;

    return <Smart code={code} ref={mergedRef} />;
  }
);

ReturnStatement.defaultProps = {
  debug: false
};

export default ReturnStatement;
