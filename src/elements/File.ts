import * as t from '@babel/types';
import { HashMap, Props } from '~/types';
import BaseElement from './BaseElement';

export default class File extends BaseElement {
  static propTypes: HashMap = {};

  static defaultProps: Props = {};

  constructor(props: Props = {}) {
    super(t.file(t.program([]), [], []), props, { bodyPath: 'program.body' });
  }
}
