import t from '@babel/types';
import Element from './Element';
import { Props } from '../types';

/**
 * <Program />
 */
export default class Program extends Element {
  propTypes: object;

  defaultProps: Props;

  constructor(props: Props = {}) {
    super(t.program([]), props);
  }
}
