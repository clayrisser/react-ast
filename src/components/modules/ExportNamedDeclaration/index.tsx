import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import ExportSpecifier from '~/components/modules/ExportSpecifier';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface ExportNamedDeclarationProps {
  debug?: boolean;
  defaultSpecifier?: string;
  namespaceSpecifier?: string;
  source?: string;
  specifiers?: ReactNode;
}

const ExportNamedDeclaration = forwardRef<
  BaseElement,
  ExportNamedDeclarationProps
>((props: ExportNamedDeclarationProps, forwardedRef: Ref<BaseElement>) => {
  const {
    debug,
    defaultSpecifier,
    namespaceSpecifier,
    source,
    specifiers
  } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = `export {}${source ? ` from '${source}'` : ''}`;

  function renderSpecifier(specifier: ReactNode) {
    if (typeof specifier === 'string') {
      return <ExportSpecifier>{specifier}</ExportSpecifier>;
    }
    return specifier;
  }

  function renderSpecifiers() {
    if (!specifiers || namespaceSpecifier) return null;
    return (
      <ParentBodyPathProvider value="specifiers">
        {Array.isArray(specifiers)
          ? specifiers.map(renderSpecifier)
          : renderSpecifier(specifiers)}
      </ParentBodyPathProvider>
    );
  }

  return (
    <Smart
      code={code}
      deletePaths={
        defaultSpecifier || namespaceSpecifier ? undefined : 'specifiers.0'
      }
      ref={mergedRef}
    >
      <ParentBodyPathProvider value={undefined}>
        {renderSpecifiers()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

ExportNamedDeclaration.defaultProps = {
  debug: false
};

export default ExportNamedDeclaration;
