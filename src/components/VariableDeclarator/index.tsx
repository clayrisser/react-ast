import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import TypeAnnotation from '~/components/TypeAnnotation';
import { debugRef } from '~/util';

export interface VariableDeclaratorProps {
  children?: ReactNode;
  debug?: boolean;
  id: string;
  typeAnnotation?: ReactNode;
}

const VariableDeclarator = forwardRef<BaseElement, VariableDeclaratorProps>(
  (props: VariableDeclaratorProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug, id, typeAnnotation } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `const ${id}${typeAnnotation ? ': any' : ''}`;

    function renderTypeAnnotation() {
      if (!typeAnnotation) return null;
      return (
        <ParentBodyPathProvider value="id.typeAnnotation">
          {typeof typeAnnotation === 'string' ? (
            <TypeAnnotation>{typeAnnotation}</TypeAnnotation>
          ) : (
            typeAnnotation
          )}
          ;
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart scopePath="declarations.0" code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
        {renderTypeAnnotation()}
      </Smart>
    );
  }
);

VariableDeclarator.defaultProps = { debug: false };

export default VariableDeclarator;
