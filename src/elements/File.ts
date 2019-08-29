import t from '@babel/types';
import Element from './Element';
import { Props } from '../types';

/**
 * <File />
 */
export default class File extends Element {
  propTypes: object;

  defaultProps: Props;

  constructor(props: Props = {}) {
    super(t.file(t.program([]), [], []), props);
  }
}
