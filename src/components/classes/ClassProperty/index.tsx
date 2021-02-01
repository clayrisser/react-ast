import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import TypeAnnotation from '~/components/types/TypeAnnotation';
import { debugRef } from '~/util';

export interface ClassPropertyProps {
  accessibility?: ClassPropertyAccessibility;
  children?: ReactNode;
  debug?: boolean;
  id: string;
  typeAnnotation?: ReactNode;
}

const ClassProperty = forwardRef<BaseElement, ClassPropertyProps>(
  (props: ClassPropertyProps, forwardedRef: Ref<BaseElement>) => {
    const { accessibility, children, debug, id, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `class C {
  ${accessibility ? `${accessibility} ` : ''}${id}${
      typeAnnotation ? ': T' : ''
    }${typeof children !== 'undefined' ? ` = ${JSON.stringify(children)}` : ''}
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

export enum ClassPropertyAccessibility {
  Private = 'private',
  Protected = 'protected',
  Public = 'public'
}

ClassProperty.defaultProps = { debug: false };

export default ClassProperty;
