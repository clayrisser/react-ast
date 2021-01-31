import React, { FC } from 'react';
import util from 'util';
import { render } from '~/index';

const logger = console;

export interface AppProps {
  hello?: string;
  howdy?: string;
}

export const App: FC<AppProps> = (props: AppProps) => {
  const { hello, howdy } = props;
  logger.log('PROPS', props);
  return (
    <>
      {hello}
      {howdy}
    </>
  );
};

App.defaultProps = {
  hello: "const hello = 'austin'",
  howdy: "const howdy = () => 'austin'"
};

logger.log('======== RECONCILER LIFECYCLE ========');
const renderedOutput = render(<App hello="const hello = 'world'" />);

logger.log('\n\n======== RENDERED OUTPUT ========');
logger.log(util.inspect(renderedOutput, false, null, true));
logger.log('\n\n--------------');
