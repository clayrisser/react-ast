import React, { FC, ReactNode } from "react";
import {
  Export,
  Expression,
  Function,
  Identifier,
  Import,
  Interface,
  JSX,
  Return,
  TypeAnnotation,
  TypeReference,
  Var,
  VarKind,
} from "~/components";

export interface FunctionalComponentProps {
  children?: ReactNode;
  debug?: boolean;
  name: string;
}

const FunctionalComponent: FC<FunctionalComponentProps> = (
  props: FunctionalComponentProps,
) => {
  const { children, name } = props;
  return (
    <>
      <Import default="React" imports={["FC"]} from="react" />
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
            </Identifier>,
          ]}
        >
          <Return>{children || <JSX />}</Return>
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
  debug: false,
};

export default FunctionalComponent;
