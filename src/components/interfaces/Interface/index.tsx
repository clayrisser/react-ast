import React, { Ref, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import { debugRef } from '~/util';
import InterfaceDeclaration, {
  InterfaceDeclarationProps
} from '~/components/interfaces/InterfaceDeclaration';

export interface InterfaceProps extends Omit<InterfaceDeclarationProps, 'id'> {
  name: string;
}

const Interface = forwardRef<BaseElement, InterfaceProps>(
  (props: InterfaceProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps: Partial<InterfaceProps> = { ...props };
    delete clonedProps.debug;
    delete clonedProps.name;
    const { debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return <InterfaceDeclaration {...clonedProps} id={name} ref={mergedRef} />;
  }
);

Interface.defaultProps = {
  debug: false
};

export default Interface;
