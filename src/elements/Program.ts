import t from '@babel/types';
import Element from './Element';
import { Props } from '../types';

export default class Program extends Element {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super(t.program([]), props);
  }
}
