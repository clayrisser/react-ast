import _ from 'lodash';
import { Path } from './types';

export function flattenPath(path?: Path | undefined): string {
  if (typeof path !== 'number' && !path) return '';
  if (!Array.isArray(path)) return path.toString();
  return _.flattenDeep(path)
    .filter((s: number | string) => s.toString().length)
    .join('.');
}
