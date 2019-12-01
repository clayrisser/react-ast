import React, { FC, ReactNode } from 'react';
import {
  ClassDeclaration,
  ClassMethod,
  Code,
  ExportDefaultDeclaration,
  ImportDeclaration
} from '../../src';

export interface ReactClassComponentProps {
  name: string;
  children?: ReactNode;
}

const ReactClassComponent: FC<ReactClassComponentProps> = (
  props: ReactClassComponentProps
) => (
  <>
    <ImportDeclaration
      defaultExport="React"
      exports={['Component']}
      source="react"
    />
    <ExportDefaultDeclaration>
      <ClassDeclaration name={props.name} superClassName="Component">
        <ClassMethod
          name="render"
          returnStatement={props.children || <Code>null</Code>}
        />
      </ClassDeclaration>
    </ExportDefaultDeclaration>
  </>
);

export default ReactClassComponent;
