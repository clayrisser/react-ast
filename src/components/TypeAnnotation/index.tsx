import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import TypeReference from '~/components/TypeReference';
import { debugRef } from '~/util';

export interface TypeAnnotationProps {
  children: ReactNode;
  debug?: boolean;
}

const TypeAnnotation = forwardRef<BaseElement, TypeAnnotationProps>(
  (props: TypeAnnotationProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = 'const c: any';

    function renderChildren() {
      if (typeof children === 'string') {
        return <TypeReference name={children} />;
      }
      return children;
    }

    return (
      <Smart
        bodyPath="typeAnnotation"
        code={code}
        deletePaths="typeAnnotation"
        ref={mergedRef}
        scopePath="declarations.0.id.typeAnnotation"
      >
        <ParentBodyPathProvider value={undefined}>
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

TypeAnnotation.defaultProps = { debug: false };

export default TypeAnnotation;
