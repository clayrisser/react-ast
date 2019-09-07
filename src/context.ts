import _ from 'lodash';
import { TemplateBuilderOptions } from '@babel/template';

const _context: Context = {
  parserOptions: {
    placeholderPattern: false,
    placeholderWhitelist: new Set()
  }
};

export interface Context {
  parserOptions: TemplateBuilderOptions;
}

export function updateContext(context: Context): Context {
  _.assign(_context, _.merge(_context, context));
  return getContext();
}

export function getContext(): Context {
  return _context;
}

export default getContext();
