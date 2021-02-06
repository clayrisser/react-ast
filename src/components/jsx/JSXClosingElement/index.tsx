import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface JSXClosingElementProps {
  arguments?: ReactNode;
  debug?: boolean;
  name?: string;
}

const JSXClosingElement = forwardRef<BaseElement, JSXClosingElementProps>(
  (props: JSXClosingElementProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `<${typeof name === 'undefined' ? '' : name}></${
      typeof name === 'undefined' ? '' : name
    }>`;

    return (
      <Smart
        code={code}
        ref={mergedRef}
        scopePath="expression.closingElement"
      />
    );
  }
);

JSXClosingElement.defaultProps = {
  debug: false
};

export default JSXClosingElement;
