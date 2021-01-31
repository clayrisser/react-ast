import t from '@babel/types';
import { HashMap, Props } from '~/types';
import BaseElement from './BaseElement';

export default class Program extends BaseElement {
  static propTypes: HashMap = {};

  static defaultProps: Props = {};

  constructor(props: Props = {}) {
    super(t.program([]), props);
  }
}
