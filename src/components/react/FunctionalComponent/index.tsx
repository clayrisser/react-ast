/**
 * File: /src/components/react/FunctionalComponent/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:05:44
 * Author: Lalit rajak
 * -----
 * BitSpur (c) Copyright 2019 - 2023
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { FC, ReactNode } from "react";
import React from "react";
import {
  Export,
  Expression,
  Function,
  Identifier,
  Import,
  Interface,
  Jsx,
  Return,
  TypeAnnotation,
  TypeReference,
  Var,
  VarKind,
} from "../..";

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
              key={0}
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
          <Return>{children || <Jsx />}</Return>
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
