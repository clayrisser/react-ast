import _get from 'lodash.get';
import BaseElement from '~/elements/BaseElement';
import { HashMap, Path } from '~/types';

const logger = console;
const g = typeof window === 'undefined' ? global : window;
const process =
  typeof g.process === 'undefined' ? { env: {} as HashMap<string> } : g.process;

export function flattenPath(path?: Path | undefined): string {
  if (typeof path !== 'number' && !path) return '';
  if (!Array.isArray(path)) return path.toString();
  return path
    .flat()
    .filter((s: Path) => s.toString().length)
    .join('.');
}

export function deletePath(value: any, path: Path): boolean {
  if (typeof value === 'undefined') return false;
  const pathArr = flattenPath(path).split('.');
  let key: string | number = pathArr.slice(pathArr.length - 1)[0];
  key = Number.isNaN(Number(key)) ? key : Number(key);
  const parentDeletePath = pathArr.slice(0, pathArr.length - 1).join('.');
  const parent = parentDeletePath ? _get(value, parentDeletePath) : value;
  if (typeof parent === 'undefined') return false;
  if (Array.isArray(parent) && typeof key === 'number') {
    const result = parent.length > key;
    parent.splice(key, 1);
    return result;
  }
  const result = key in parent;
  delete parent[key];
  return result;
}

function isDev(): boolean {
  if (typeof process.env.NODE_ENV === 'undefined') {
    return typeof process.env.__DEV__ === 'undefined'
      ? false
      : process.env.__DEV__.toLowerCase() !== 'false';
  }
  return (
    process.env.NODE_ENV.toLowerCase() !== 'prod' ||
    process.env.NODE_ENV.toLowerCase() !== 'production'
  );
}

export function debugRef(debug = true) {
  if (!debug) return () => undefined;
  return (ref: BaseElement) => logger.debug(JSON.stringify(ref.node, null, 2));
}

export const dev = isDev();
