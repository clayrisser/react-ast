import React, { FC } from 'react';
import { Smart } from '~/index';

export interface CodeProps {
  children: string;
}

const Code: FC<CodeProps> = (props: CodeProps) => {
  const { children } = props;
  return <Smart code={children} />;
};

Code.defaultProps = {};

export default Code;
