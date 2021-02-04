import React, { forwardRef, Ref, ReactNode } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import { debugRef } from '~/util';
import ImportDeclaration, {
  ImportDeclarationProps
} from '~/components/modules/ImportDeclaration';

export interface ImportProps
  extends Omit<
    ImportDeclarationProps,
    'defaultSpecifier',
    'source',
    'specifiers',
    'namespaceSpecifier'
  > {
  default?: string;
  imports?: ReactNode;
  from?: string;
  namespace?: string;
}

const Import = forwardRef<BaseElement, ImportProps>(
  (props: ImportProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.debug;
    delete clonedProps.default;
    delete clonedProps.from;
    delete clonedProps.imports;
    delete clonedProps.namespace;
    const { debug, namespace, imports } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return (
      <ImportDeclaration
        {...clonedProps}
        defaultSpecifier={props.default}
        namespaceSpecifier={namespace}
        ref={mergedRef}
        source={props.from}
        specifiers={imports}
      />
    );
  }
);

Import.defaultProps = {
  debug: false
};

export default Import;
