import React, { FC, ReactNode } from 'react';
import { debugRef } from '~/util';
import { Smart } from '~/index';

export interface BlockStatementProps {
  children?: ReactNode;
  debug?: boolean;
}

const BlockStatement: FC<BlockStatementProps> = (
  props: BlockStatementProps
) => {
  const { children, debug } = props;
  const code = '{}';
  return (
    <Smart code={code} ref={debugRef(debug)}>
      {children}
    </Smart>
  );
};

BlockStatement.defaultProps = { debug: false };

export default BlockStatement;
