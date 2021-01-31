import React from 'react';
import util from 'util';
import { render } from '~/index';

const logger = console;

logger.log('======== RECONCILER LIFECYCLE ========');
const renderedOutput = render(<></>);

logger.log('\n\n======== RENDERED OUTPUT ========');
logger.log(util.inspect(renderedOutput, false, null, true));
logger.log('\n\n--------------');
