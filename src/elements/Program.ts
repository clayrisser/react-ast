import t from '@babel/types';
import BaseElement from './BaseElement';

export default class Program extends BaseElement {
  static defaultProps: Partial<JSX.IntrinsicElements['Program']> = {};

  constructor(props: JSX.IntrinsicElements['Program'] = {}) {
    super(t.program([]), props);
  }
}
