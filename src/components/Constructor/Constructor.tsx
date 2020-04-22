import React, { FC, ReactNode } from 'react';
import { ClassMethod } from '../..';

export interface ConstructorProps {
  children?: ReactNode;
  params?: ReactNode[];
  returnStatement?: ReactNode;
  returnType?: ReactNode;
}

export const Constructor: FC<ConstructorProps> = (props: ConstructorProps) => (
  <ClassMethod {...props} name="constructor" />
);
