import React, { FC, ReactNode } from 'react';
import {
  Code,
  ExportDefaultDeclaration,
  ImportDeclaration,
  ArrowFunctionExpression,
  VariableDeclaration
} from '../../src';

export interface ReactFunctionalComponentProps {
  name: string;
  children?: ReactNode;
}

const ReactFunctionalComponent: FC<ReactFunctionalComponentProps> = (
  props: ReactFunctionalComponentProps
) => (
  <>
    <ImportDeclaration
      defaultExport="React"
      exports={['Component', 'FC']}
      source="react"
    />
    <VariableDeclaration kind="const" name={props.name}>
      <ArrowFunctionExpression
        params={['props']}
        returnStatement={props.children || <Code>null</Code>}
      />
    </VariableDeclaration>
    <ExportDefaultDeclaration>
      <Code>{props.name}</Code>
    </ExportDefaultDeclaration>
  </>
);

export default ReactFunctionalComponent;
