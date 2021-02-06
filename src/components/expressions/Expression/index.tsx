import React, { FC, Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import AssignmentExpression from '~/components/expressions/AssignmentExpression';
import BaseElement from '~/elements/BaseElement';
import Identifier from '~/components/Identifier';
import MemberExpression from '~/components/expressions/MemberExpression';
import { debugRef } from '~/util';
import CallExpression, {
  CallExpressionProps
} from '~/components/expressions/CallExpression';

export interface ExpressionProps extends Omit<CallExpressionProps, 'name'> {
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
        (typeof props.properties === 'string'
          ? props.properties.split('.')
          : props.properties) || []
      );
      if (typeof children !== 'undefined') {
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
  debug: false
};

export default Expression;
