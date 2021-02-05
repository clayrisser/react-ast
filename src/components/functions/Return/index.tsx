import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import { debugRef } from '~/util';
import ReturnStatement, {
  ReturnStatementProps
} from '~/components/functions/ReturnStatement';

export interface ReturnProps extends ReturnStatementProps {}

const Return = forwardRef<BaseElement, ReturnProps>(
  (props: ReturnProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.debug;
    const { debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return <ReturnStatement {...clonedProps} ref={mergedRef} />;
  }
);

Return.defaultProps = {
  debug: false
};

export default Return;
