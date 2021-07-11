import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import ImportSpecifier from '~/components/modules/ImportSpecifier';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface ImportDeclarationProps {
  debug?: boolean;
  defaultSpecifier?: string;
  namespaceSpecifier?: string;
  source?: string;
  specifiers?: ReactNode;
}

const ImportDeclaration = forwardRef<BaseElement, ImportDeclarationProps>(
  (props: ImportDeclarationProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, defaultSpecifier, namespaceSpecifier, source, specifiers } =
      props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `import ${
      namespaceSpecifier
        ? ` * as ${namespaceSpecifier}`
        : defaultSpecifier || 'I'
    } from '${source}'`;

    function renderSpecifier(specifier: ReactNode) {
      if (typeof specifier === 'string') {
        return <ImportSpecifier>{specifier}</ImportSpecifier>;
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
  }
);

ImportDeclaration.defaultProps = {
  debug: false
};

export default ImportDeclaration;
