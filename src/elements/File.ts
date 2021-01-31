import * as t from '@babel/types';
import { Props } from '~/types';
import BaseElement from './BaseElement';

export default class File extends BaseElement {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super(t.file(t.program([]), [], []), props);
  }
}
