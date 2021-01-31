import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface TypeReferenceProps {
  children?: ReactNode;
  name: string;
  debug?: boolean;
}

const TypeReference = forwardRef<BaseElement, TypeReferenceProps>(
  (props: TypeReferenceProps, forwardedRef: Ref<BaseElement>) => {
    const { children, name, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `const c: ${name}`;
    return (
      <Smart
        bodyPath="typeParameters"
        code={code}
        ref={mergedRef}
        scopePath="declarations.0.id.typeAnnotation.typeAnnotation"
      >
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

TypeReference.defaultProps = { debug: false };

export default TypeReference;
