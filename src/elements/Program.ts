import t from '@babel/types';
import { Props } from '~/types';
import BaseElement from './BaseElement';

export default class Program extends BaseElement {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super(t.program([]), props);
  }
}
