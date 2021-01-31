import { ParserOptions } from '@babel/parser';
import { BaseNode, Node, Instance, Props } from '~/types';

export interface IElement {
  new (props?: Props, parserOptions?: ParserOptions): BaseElement;
  propTypes: object;
  defaultProps: Props;
}

export default class BaseElement implements Instance {
  static defaultProps: Props = {};

  static propTypes: object = {};

  node: Node;

  props: Props = {};

  children: BaseElement[] = [];

  constructor(baseNode: BaseNode | BaseNode[], _props: Props = {}) {
    if (Array.isArray(baseNode)) throw new Error('cannot be array');
    this.node = baseNode;
  }

  appendChild(_child: BaseElement) {
    return undefined;
  }

  removeChild(_child: BaseElement) {
    return undefined;
  }

  commitMount() {
    return undefined;
  }

  commitUpdate(_newProps: Props) {
    return undefined;
  }
}
