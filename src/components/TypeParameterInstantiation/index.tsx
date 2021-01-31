import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import TypeReference from '~/components/TypeReference';
import { debugRef } from '~/util';

export interface TypeParameterInstantiationProps {
  children: ReactNode;
  debug?: boolean;
}

const TypeParameterInstantiation = forwardRef<
  BaseElement,
  TypeParameterInstantiationProps
>((props: TypeParameterInstantiationProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = 'const c: T<any>';

  function renderChildren() {
    if (typeof children === 'string') {
      return <TypeReference name={children} />;
    }
    return children;
  }

  return (
    <Smart
      bodyPath="params"
      code={code}
      deletePaths="params.0"
      ref={mergedRef}
      scopePath="declarations.0.id.typeAnnotation.typeAnnotation.typeParameters"
    >
      <ParentBodyPathProvider value={undefined}>
        {renderChildren()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

TypeParameterInstantiation.defaultProps = { debug: false };

export default TypeParameterInstantiation;
