import { BaseNode, Node, Instance, Props } from '~/types';

export interface IElement {
  new (props?: Props): BaseElement;
  propTypes: object;
  defaultProps: Props;
}

export default class BaseElement implements Instance {
  static defaultProps: Props = {};

  static propTypes: object = {};

  node: Node;

  props: Props;

  children: BaseElement[] = [];

  constructor(baseNode: BaseNode | BaseNode[], props: Props = {}) {
    this.node = baseNode;
    this.props = props;
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
