import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface AssignmentExpressionProps {
  children?: ReactNode;
  debug?: boolean;
  left: string;
}

const AssignmentExpression = forwardRef<BaseElement, AssignmentExpressionProps>(
  (props: AssignmentExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, left } = props;
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
    const code = `${left} = ${
      typeof children !== 'undefined' && !isComponent
        ? `${JSON.stringify(children)}`
        : 'undefined'
    }`;

    function renderChildren() {
      if (!isComponent) return null;
      return children;
    }

    return (
      <Smart
        bodyPath="right"
        code={code}
        ref={mergedRef}
        scopePath="expression"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

AssignmentExpression.defaultProps = {
  debug: false
};

export default AssignmentExpression;
