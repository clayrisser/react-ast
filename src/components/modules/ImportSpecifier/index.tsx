import React, { Ref, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface ImportSpecifierProps {
  children: string;
  debug?: boolean;
  local?: string;
}

const ImportSpecifier = forwardRef<BaseElement, ImportSpecifierProps>(
  (props: ImportSpecifierProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, children, local } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `import {${children}${local ? ` as ${local}` : ''}} from 'm'`;

    return <Smart scopePath="specifiers.0" code={code} ref={mergedRef} />;
  }
);

ImportSpecifier.defaultProps = {
  debug: false
};

export default ImportSpecifier;
