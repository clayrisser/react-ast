import PropTypes from 'prop-types';
import { BaseNode } from '@babel/types';
import { Node, Instance, Prop, Props } from '../types';

export interface ElementConstructor {
  new (props?: Props): Element;
  propTypes: object;
  defaultProps: Props;
}

export default class Element implements Instance {
  static defaultProps: Props = {};

  static propTypes: object = {};

  node: Node;

  props: Props;

  children: Element[] = [];

  constructor(baseNode: BaseNode | BaseNode[], props: Props = {}) {
    if (Array.isArray(baseNode)) throw new Error('cannot be array');
    this.node = baseNode;
    this.props = this.getProps(props);
  }

  appendChild(child: Element) {
    if (!this.node.body) return;
    if (this.node.body) this.children.push(child);
    this.node.body.push(child.node);
  }

  removeChild(child: Element) {
    if (!this.node.body) return;
    this.children.splice(this.children.indexOf(child), 1);
    this.children.splice(this.children.indexOf(child), 1);
  }

  commitMount() {
    this.update();
  }

  commitUpdate(newProps: Props) {
    this.props = {
      ...this.props,
      ...newProps
    };
    this.update();
  }

  update() {
    this.updateNode();
  }

  updateNode() {
    Object.keys(this.props).forEach((key: string) => {
      const prop: Prop = this.props[key];
      if (typeof prop !== 'undefined' && prop !== null) {
      }
    });
  }

  getProps(props: Props): Props {
    props = { ...props };
    const { defaultProps, propTypes } = this.constructor as ElementConstructor;
    Object.keys(defaultProps).forEach(key => {
      const defaultProp = defaultProps[key];
      if (typeof props[key] === 'undefined' || props[key] === null) {
        props[key] = defaultProp;
      }
    });
    PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
    return props;
  }
}
