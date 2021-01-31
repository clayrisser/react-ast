import { Path } from '~/types';

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

export const dev = isDev();
