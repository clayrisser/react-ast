import _merge from 'lodash.merge';
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
  Object.assign(_context, _merge(_context, context));
  return getContext();
}

export function getContext(): Context {
  return _context;
}

export default getContext();
