import React, { Ref, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import { debugRef } from '~/util';
import { Smart } from '~/index';

export interface NumberLiteralProps {
  children: number;
  debug?: boolean;
}

const NumberLiteral = forwardRef<BaseElement, NumberLiteralProps>(
  (props: NumberLiteralProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;

    const code = `var a = ${children}`;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return (
      <Smart code={code} ref={mergedRef} scopePath="declarations.0.init" />
    );
  }
);

export default NumberLiteral;
