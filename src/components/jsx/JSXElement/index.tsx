import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Identifier from '~/components/Identifier';
import BaseElement from '~/elements/BaseElement';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';

export interface JSXElementProps {
  arguments?: ReactNode;
  debug?: boolean;
  name: string;
}

const JSXElement = forwardRef<BaseElement, JSXElementProps>(
  (props: JSXElementProps, forwardedRef: Ref<BaseElement>) => {
    const { debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `${name}()`;

    function renderArgument(argument: ReactNode) {
      if (typeof argument === 'string') {
        return <Identifier>{argument}</Identifier>;
      }
      return argument;
    }

    function renderArguments() {
      if (!props.arguments) return null;
      return (
        <ParentBodyPathProvider value="arguments">
          {Array.isArray(props.arguments)
            ? props.arguments.map(renderArgument)
            : renderArgument(props.arguments)}
        </ParentBodyPathProvider>
      );
    }

    return (
      <Smart code={code} ref={mergedRef} scopePath="expression">
        <ParentBodyPathProvider value={undefined}>
          {renderArguments()}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

JSXElement.defaultProps = {
  debug: false
};

export default JSXElement;
