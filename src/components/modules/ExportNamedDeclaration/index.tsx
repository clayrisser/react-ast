import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import Code from '~/components/Code';
import ExportSpecifier from '~/components/modules/ExportSpecifier';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface ExportNamedDeclarationProps {
  children?: ReactNode;
  debug?: boolean;
  source?: string;
  specifiers?: ReactNode;
}

const ExportNamedDeclaration = forwardRef<
  BaseElement,
  ExportNamedDeclarationProps
>((props: ExportNamedDeclarationProps, forwardedRef: Ref<BaseElement>) => {
  const { children, debug, source, specifiers } = props;
  const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
  const code = `export {}${source ? ` from '${source}'` : ''}`;

  function renderChildren() {
    if (typeof children === 'string') {
      return <Code>{children}</Code>;
    }
    return children;
  }

  function renderSpecifier(specifier: ReactNode) {
    if (typeof specifier === 'string') {
      return <ExportSpecifier>{specifier}</ExportSpecifier>;
    }
    return specifier;
  }

  function renderSpecifiers() {
    if (!specifiers) return null;
    return (
      <ParentBodyPathProvider value="specifiers">
        {Array.isArray(specifiers)
          ? specifiers.map(renderSpecifier)
          : renderSpecifier(specifiers)}
      </ParentBodyPathProvider>
    );
  }

  return (
    <Smart code={code} bodyPath="declaration" ref={mergedRef}>
      <ParentBodyPathProvider value={undefined}>
        {renderSpecifiers()}
        {renderChildren()}
      </ParentBodyPathProvider>
    </Smart>
  );
});

ExportNamedDeclaration.defaultProps = {
  debug: false
};

export default ExportNamedDeclaration;
