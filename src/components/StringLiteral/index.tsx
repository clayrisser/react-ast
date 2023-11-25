import React, { Ref, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import { Smart } from '~/index';
import BaseElement from '~/elements/BaseElement';
import { debugRef } from '~/util';

export interface StringLiteralProps {
  children: string;
  debug?: boolean;
}

const StringLiteral = forwardRef<BaseElement, StringLiteralProps>(
  (props: StringLiteralProps, forwardedRef: Ref<BaseElement>) => {
    const { debug } = props;

    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    const code = `var a = ${props.children}`;

    return (
      <Smart code={code} ref={mergedRef} scopePath="declarations.0.init" />
    );
  }
);

export default StringLiteral;
