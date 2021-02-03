import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import TypeAnnotation from '~/components/types/TypeAnnotation';
import { debugRef } from '~/util';

export interface PropertySignatureProps {
  debug?: boolean;
  id: string;
  typeAnnotation?: ReactNode;
}

const PropertySignature = forwardRef<BaseElement, PropertySignatureProps>(
  (props: PropertySignatureProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, id, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `interface I {
  ${id}${typeAnnotation ? ': T' : ''};
}`;

    function renderTypeAnnotation() {
      if (!typeAnnotation) return null;
      return (
        <ParentBodyPathProvider value="typeAnnotation">
          {typeof typeAnnotation === 'string' ? (
            <TypeAnnotation>{typeAnnotation}</TypeAnnotation>
          ) : (
            typeAnnotation
          )}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart scopePath="body.body.0" code={code} ref={mergedRef}>
        {renderTypeAnnotation()}
      </Smart>
    );
  }
);

PropertySignature.defaultProps = { debug: false };

export default PropertySignature;
