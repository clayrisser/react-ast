import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import { debugRef } from '~/util';
import ClassDeclaration, {
  ClassDeclarationProps
} from '~/components/classes/ClassDeclaration';

export interface ClassProps
  extends Omit<
    ClassDeclarationProps,
    'superClass' | 'superTypeParameters' | 'id'
  > {
  extends?: ReactNode;
  extendsTypeParameters?: ReactNode;
  name: string;
}

const Class = forwardRef<BaseElement, ClassProps>(
  (props: ClassProps, forwardedRef: Ref<BaseElement>) => {
    const clonedProps = { ...props };
    delete clonedProps.debug;
    delete clonedProps.extends;
    delete clonedProps.extendsTypeParameters;
    delete clonedProps.name;
    const { debug, extendsTypeParameters, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    return (
      <ClassDeclaration
        {...clonedProps}
        id={name}
        ref={mergedRef}
        superClass={props.extends}
        superTypeParameters={extendsTypeParameters}
      />
    );
  }
);

Class.defaultProps = {
  debug: false
};

export default Class;
