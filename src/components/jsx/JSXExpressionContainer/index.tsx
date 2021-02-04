import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface JSXExpressionContainerProps {
  children?: ReactNode;
  debug?: boolean;
}

const JSXExpressionContainer = forwardRef<
  BaseElement,
  JSXExpressionContainerProps
>((props: JSXExpressionContainerProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const isComponent = (() => {
    if (typeof children === 'undefined') return false;
    const childrenKeys = new Set(Object.keys(children || {}));
    return (
      childrenKeys.has('$$typeof') &&
      childrenKeys.has('key') &&
      childrenKeys.has('props') &&
      childrenKeys.has('ref') &&
      childrenKeys.has('type')
    );
  })();
  const code = `<J a={${
    typeof children !== 'undefined' && !isComponent
      ? `${JSON.stringify(children)}`
      : 'a'
  }} />`;

  function renderChildren() {
    if (isComponent) return children;
    return null;
  }

  return (
    <Smart
      bodyPath="expression"
      code={code}
      deletePaths={
        typeof children !== 'undefined' && !isComponent
          ? undefined
          : 'expression'
      }
      ref={mergedRef}
      scopePath="expression.openingElement.attributes.0.value"
    >
      <ParentBodyPathProvider value={undefined}>
        {renderChildren()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

JSXExpressionContainer.defaultProps = { debug: false };

export default JSXExpressionContainer;
