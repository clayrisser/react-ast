import React, { FC } from 'react';
import {
  Export,
  Expression,
  Function,
  Identifier,
  Import,
  Interface,
  Return,
  TypeAnnotation,
  TypeReference,
  Var,
  VarKind
} from '~/components';

export interface FunctionalComponentProps {
  name: string;
  debug?: boolean;
}

const FunctionalComponent: FC<FunctionalComponentProps> = (
  props: FunctionalComponentProps
) => {
  const { name } = props;
  return (
    <>
      <Import default="React" imports={['FC']} from="react" />
      <Export>
        <Interface name={`${name}Props`} />
      </Export>
      <Var kind={VarKind.Const} typeAnnotation={`FC<${name}Props>`} name={name}>
        <Function
          arrow
          params={[
            <Identifier
              typeAnnotation={
                <TypeAnnotation>
                  <TypeReference name={`${name}Props`} />
                </TypeAnnotation>
              }
            >
              props
            </Identifier>
          ]}
        >
          <Return />
        </Function>
      </Var>
      <Expression properties={`${name}.defaultProps`}>{{}}</Expression>
      <Export default>
        <Identifier>{name}</Identifier>
      </Export>
    </>
  );
};

FunctionalComponent.defaultProps = {
  debug: false
};

export default FunctionalComponent;
