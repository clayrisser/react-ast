import * as t from '@babel/types';
import BaseElement from './BaseElement';

export default class File extends BaseElement {
  static defaultProps: Partial<JSX.IntrinsicElements['File']> = {};

  constructor(props: JSX.IntrinsicElements['File'] = {}) {
    super(t.file(t.program([]), [], []), props, { bodyPath: 'program.body' });
  }
}
