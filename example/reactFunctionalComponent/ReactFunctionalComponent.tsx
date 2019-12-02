import React, { FC, ReactNode } from 'react';
import {
  ArrowFunctionExpression,
  Code,
  ExportDefaultDeclaration,
  ImportDeclaration,
  InterfaceDeclaration,
  Param,
  TypeAnnotation,
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
    <InterfaceDeclaration name={`${props.name}Props`} />
    <VariableDeclaration
      kind="const"
      name={props.name}
      type={<TypeAnnotation params={[`${props.name}Props`]}>FC</TypeAnnotation>}
    >
      <ArrowFunctionExpression
        params={[<Param type={`${props.name}Props`}>props</Param>]}
        returnStatement={props.children || <Code>null</Code>}
      />
    </VariableDeclaration>
    <ExportDefaultDeclaration>
      <Code>{props.name}</Code>
    </ExportDefaultDeclaration>
  </>
);

export default ReactFunctionalComponent;
