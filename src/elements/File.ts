import * as t from '@babel/types';
import Element from './Element';
import { Props } from '../types';

export default class File extends Element {
  static propTypes: object = {};

  static defaultProps: Props = {};

  constructor(props: Props = {}) {
    super(t.file(t.program([]), [], []), props, { bodyPath: 'program.body' });
  }
}
