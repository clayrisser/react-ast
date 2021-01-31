import BaseElement from '~/elements/BaseElement';
import { Path } from '~/types';

const logger = console;
const { env } = process;

export function flattenPath(path?: Path | undefined): string {
  if (typeof path !== 'number' && !path) return '';
  if (!Array.isArray(path)) return path.toString();
  return path
    .flat()
    .filter((s: Path) => s.toString().length)
    .join('.');
}

function isDev(): boolean {
  if (typeof env.NODE_ENV === 'undefined') {
    return typeof env.__DEV__ === 'undefined'
      ? false
      : env.__DEV__.toLowerCase() !== 'false';
  }
  return (
    env.NODE_ENV.toLowerCase() !== 'prod' ||
    env.NODE_ENV.toLowerCase() !== 'production'
  );
}

export function debugRef(debug = true) {
  if (!debug) return () => undefined;
  return (ref: BaseElement) => logger.debug(JSON.stringify(ref.node, null, 2));
}

export const dev = isDev();
