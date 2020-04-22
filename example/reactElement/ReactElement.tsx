import React, { FC, ReactNode } from 'react';
import {
  CallExpression,
  ClassDeclaration,
  ClassProperty,
  Constructor,
  ExportDefaultDeclaration,
  ImportDeclaration,
  Literal,
  Param
} from '../../src';

export interface ReactClassComponentProps {
  name: string;
  children?: ReactNode;
}

const ReactClassComponent: FC<ReactClassComponentProps> = (
  _props: ReactClassComponentProps
) => (
  <>
    <ImportDeclaration exports={['WeakValidationMap']} source="react" />
    <ImportDeclaration
      exports={['BaseElement', 'Gtk', 'Props']}
      source="@react-gtk/core"
    />
    <ExportDefaultDeclaration>
      <ClassDeclaration name="Button" superClassName="BaseElement<Gtk.Box>">
        <ClassProperty static name="defaultProps" type="Props">
          <Literal>{{}}</Literal>
        </ClassProperty>
        <ClassProperty static name="propTypes" type="WeakValidationMap<any>">
          <Literal>{{}}</Literal>
        </ClassProperty>
        <Constructor
          params={[
            <Param type="Props" default={<Literal>{{}}</Literal>}>
              props
            </Param>
          ]}
        >
          <CallExpression name="super" arguments={['new Gtk.Box()', 'props']} />
        </Constructor>
      </ClassDeclaration>
    </ExportDefaultDeclaration>
  </>
);

export default ReactClassComponent;
