import React from 'react';
import util from 'util';
import { render, Smart } from '~/index';

const logger = console;

logger.log('======== RECONCILER LIFECYCLE ========');
const renderedOutput = render(
  <>
    <Smart code="const hello = 'world'" />
    {"const howdy = () => 'texas'"}
  </>
);

logger.log('\n\n======== RENDERED OUTPUT ========');
logger.log(util.inspect(renderedOutput, false, null, true));
logger.log('\n\n--------------');
