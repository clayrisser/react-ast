/**
 * File: /src/components/expressions/Expression/index.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:04:04
 * Author: dharmendra
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

import React, { FC, Ref, ReactNode, forwardRef } from "react";
import useMergedRef from "@react-hook/merged-ref";
import AssignmentExpression from "../../../components/expressions/AssignmentExpression";
import BaseElement from "../../../elements/BaseElement";
import Identifier from "../../../components/Identifier";
import MemberExpression from "../../../components/expressions/MemberExpression";
import { debugRef } from "../../../util";
import CallExpression, {
  CallExpressionProps,
} from "../../../components/expressions/CallExpression";

export interface ExpressionProps extends Omit<CallExpressionProps, "name"> {
  call?: boolean;
  children?: ReactNode;
  properties: string | string[];
}

export interface CompProps {
  children?: ReactNode;
}

const Expression = forwardRef<BaseElement, ExpressionProps>(
  (props: ExpressionProps, forwardedRef: Ref<BaseElement>) => {
    const { call, children, debug } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));

    function renderAssignmentExpression() {
      const properties = renderProperties(
        (typeof props.properties === "string"
          ? props.properties.split(".")
          : props.properties) || []
      );
      if (typeof children !== "undefined") {
        return (
          <AssignmentExpression left={properties}>
            {children}
          </AssignmentExpression>
        );
      }
      return properties;
    }

    function renderProperties(properties: string[]) {
      const Comp = properties.reverse().reduce(
        (Comp: FC<CompProps>, property: string, i: number) => {
          let NewComp = ({ children }: CompProps) => (
            <Comp>
              {call && i === 0 ? (
                <CallExpression arguments={props.arguments} name={property}>
                  {children}
                </CallExpression>
              ) : (
                <MemberExpression name={property}>{children}</MemberExpression>
              )}
            </Comp>
          );
          if (i === properties.length - 1) {
            NewComp = () => (
              <Comp>
                {call && properties.length <= 1 ? (
                  <CallExpression arguments={props.arguments} name={property} />
                ) : (
                  <Identifier ref={mergedRef}>{property}</Identifier>
                )}
              </Comp>
            );
          }
          return NewComp;
        },
        ({ children }: CompProps) => <>{children}</>
      );
      return <Comp />;
    }

    return renderAssignmentExpression();
  }
);

Expression.defaultProps = {
  call: false,
  debug: false,
};

export default Expression;
