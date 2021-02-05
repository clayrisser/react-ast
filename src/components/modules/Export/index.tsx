import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ExportDefaultDeclaration from '~/components/modules/ExportDefaultDeclaration';
import { debugRef } from '~/util';
import ExportNamedDeclaration, {
  ExportNamedDeclarationProps
} from '~/components/modules/ExportNamedDeclaration';

export interface ExportProps
  extends Omit<ExportNamedDeclarationProps, 'specifiers' | 'source'> {
  default?: boolean;
  exports?: ReactNode;
  from?: string;
}

const Export = forwardRef<BaseElement, ExportProps>(
  (props: ExportProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.from;
    delete clonedProps.exports;
    delete clonedProps.debug;
    const { children, exports, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    if (props.default) {
      return (
        <ExportDefaultDeclaration ref={mergedRef}>
          {children}
        </ExportDefaultDeclaration>
      );
    }
    return (
      <ExportNamedDeclaration
        {...clonedProps}
        ref={mergedRef}
        source={props.from}
        specifiers={exports}
      />
    );
  }
);

Export.defaultProps = {
  debug: false,
  default: false
};

export default Export;
