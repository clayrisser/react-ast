import React, { Ref, ReactNode, forwardRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import BaseElement from '~/elements/BaseElement';
import JSXClosingElement from '~/components/jsx/JSXClosingElement';
import ParentBodyPathProvider from '~/providers/ParentBodyPathProvider';
import Smart from '~/components/Smart';
import { debugRef } from '~/util';
import JSXOpeningElement, {
  JSXOpeningElementProps
} from '~/components/jsx/JSXOpeningElement';

export interface JSXElementProps extends JSXOpeningElementProps {
  children?: ReactNode;
}

const JSXElement = forwardRef<BaseElement, JSXElementProps>(
  (props: JSXElementProps, forwardedRef: Ref<BaseElement>) => {
    const { attributes, selfClosing, children, debug, name } = props;
    const mergedRef = useMergedRef<any>(forwardedRef, debugRef(debug));
    const code = `<${typeof name === 'undefined' ? '' : 'E'}${
      children || !name ? `></${typeof name === 'undefined' ? '' : 'E'}` : ' /'
    }>`;

    function renderOpeningElement() {
      return (
        <ParentBodyPathProvider value="openingElement">
          <JSXOpeningElement
            attributes={attributes}
            name={name}
            selfClosing={!children && selfClosing}
          />
        </ParentBodyPathProvider>
      );
    }

    function renderClosingElement() {
      return (
        <ParentBodyPathProvider value="closingElement">
          <JSXClosingElement name={name} />
        </ParentBodyPathProvider>
      );
    }

    function renderChildren() {
      return children;
    }

    return (
      <Smart
        code={code}
        scopePath="expression"
        bodyPath="children"
        ref={mergedRef}
      >
        <ParentBodyPathProvider value={undefined}>
          {renderOpeningElement()}
          {renderClosingElement()}
          {renderChildren()}
        </ParentBodyPathProvider>
      </Smart>
    );
  }
);

JSXElement.defaultProps = {
  debug: false,
  selfClosing: true
};

export default JSXElement;
