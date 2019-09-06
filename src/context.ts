import _ from 'lodash';
import { ParserOptions } from '@babel/parser';

const _context: Context = {
  parserOptions: {}
};

export interface Context {
  parserOptions: ParserOptions;
}

export function updateContext(context: Context): Context {
  _.assign(_context, {
    ..._context,
    ...context
  });
  return getContext();
}

export function getContext(): Context {
  return _context;
}

export default getContext();
