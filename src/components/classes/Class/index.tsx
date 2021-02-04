import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import ClassDeclaration, {
  ClassDeclarationProps
} from '~/components/classes/ClassDeclaration';
import { debugRef } from '~/util';

export interface ClassProps
  extends Omit<ClassDeclarationProps, 'superClass' | 'superTypeParameters'> {
  extends?: ReactNode;
  extendsTypeParameters?: ReactNode;
}

const Class = forwardRef<BaseElement, ClassProps>(
  (props: ClassProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.debug;
    delete clonedProps.extends;
    delete clonedProps.extendsTypeParameters;
    const { debug, extendsTypeParameters } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return (
      <ClassDeclaration
        {...clonedProps}
        superClass={props.extends}
        superTypeParameters={extendsTypeParameters}
        ref={mergedRef}
      />
    );
  }
);

Class.defaultProps = {
  debug: false
};

export default Class;
