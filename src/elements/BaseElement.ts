import PropTypes from 'prop-types';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { ParserOptions } from '@babel/parser';
import { BaseNode, HashMap, Path, Node, Instance, Props } from '~/types';
import { flattenPath } from '~/util';

export interface IElement<P = Props> {
  new (props?: P, parserOptions?: ParserOptions): BaseElement;
  propTypes: HashMap;
  defaultProps: Props;
}

export interface Meta {
  bodyPath: Path;
  parentBodyPath: Path | null;
}

export default class BaseElement implements Instance {
  static defaultProps: Props = {};

  static propTypes: HashMap = {};

  node: Node;

  props: Props;

  children: BaseElement[] = [];

  meta: Meta = {
    bodyPath: 'body',
    parentBodyPath: null
  };

  getBodyPath(path?: Path | null): string {
    return flattenPath(path || this.meta.bodyPath);
  }

  getBody(
    body: BaseNode | BaseNode[],
    path?: Path | null
  ): BaseNode | BaseNode[] {
    const bodyPath = this.getBodyPath(path);
    if (!bodyPath.length) return body;
    return _get(body, bodyPath);
  }

  setBody(
    body: BaseNode | BaseNode[],
    value: BaseNode | BaseNode[],
    path?: Path | null
  ): BaseNode | BaseNode[] {
    const bodyPath = this.getBodyPath(path);
    console.log('------');
    console.log(this.node);
    console.log(bodyPath);
    console.log(value);
    if (!bodyPath.length) return body;
    return _set(body, bodyPath, value);
  }

  constructor(
    baseNode: BaseNode | BaseNode[],
    props: Props = {},
    meta?: Partial<Meta>
  ) {
    if (Array.isArray(baseNode)) throw new Error('cannot be array');
    if (meta) {
      this.meta = {
        ...this.meta,
        ...meta
      };
    }
    this.node = baseNode;
    this.props = this.getProps(props);
  }

  appendChild(child: BaseElement) {
    const body = this.getBody(this.node, child.meta.parentBodyPath);
    this.children.push(child);
    if (Array.isArray(body)) {
      body.push(child.node);
    } else {
      this.setBody(this.node, child.node, child.meta.parentBodyPath);
    }
  }

  removeChild(child: BaseElement) {
    const body = this.getBody(this.node, child.meta.parentBodyPath);
    if (!body || !Array.isArray(body)) return;
    this.children.splice(this.children.indexOf(child), 1);
    body.splice(body.indexOf(child.node), 1);
  }

  commitMount() {
    return undefined;
  }

  commitUpdate(newProps: Props) {
    this.props = {
      ...this.props,
      ...newProps
    };
  }

  getProps(props: Props): Props {
    props = { ...props };
    const { defaultProps, propTypes } = this.constructor as IElement;
    Object.keys(defaultProps).forEach((key) => {
      const defaultProp = defaultProps[key];
      if (typeof props[key] === 'undefined' || props[key] === null) {
        props[key] = defaultProp;
      }
    });
    PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
    return props;
  }
}
