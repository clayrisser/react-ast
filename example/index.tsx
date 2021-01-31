import React from 'react';
import util from 'util';
import { render, Hello, Howdy } from '../src';

const logger = console;

logger.log('======== RECONCILER LIFECYCLE ========');
const renderedOutput = render(
  <>
    <Hello />
    <Howdy />
    <Hello />
    <Hello />
  </>
);

logger.log('\n\n======== RENDERED OUTPUT ========');
logger.log(util.inspect(renderedOutput, false, null, true));
logger.log('\n\n--------------');
