import React, { Ref, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface IdentifierProps {
  children: string;
  debug?: boolean;
}

const Identifier = forwardRef<BaseElement, IdentifierProps>(
  (props: IdentifierProps, forwardedRef: Ref<BaseElement>) => {
    const { children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `const ${children}: any`;
    return (
      <Smart scopePath="declarations.0.id" code={code} ref={mergedRef}>
        <ParentBodyPathProvider value={undefined}>
          {children}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

Identifier.defaultProps = { debug: false };

export default Identifier;
