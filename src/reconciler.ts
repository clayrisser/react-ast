import ReactReconciler from 'react-reconciler';
import createElement from './createElement';
import dev from './dev';
import {
  ChildSet,
  Container,
  HostContext,
  HydratableInstance,
  Instance,
  NoTimeout,
  Props,
  PublicInstance,
  TextInstance,
  TimeoutHandle,
  Type,
  UpdatePayload
} from './types';
import { Smart } from './elements';

const log = console;

export default ReactReconciler<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>({
  createInstance(
    type: Type,
    props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): Instance {
    return createElement(type, props);
  },

  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {
    parentInstance.appendChild(child);
  },

  finalizeInitialChildren(
    _parentInstance: Instance,
    _type: Type,
    _props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): boolean {
    return true;
  },

  createTextInstance(
    text: string,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): TextInstance {
    const label = new Smart({ code: text }, {});
    label.commitMount(); // prob should run at a later point
    return label;
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance;
  },

  prepareForCommit(_containerInfo: Container): void {
    // noop
  },

  prepareUpdate(
    _instance: Instance,
    _type: Type,
    _oldProps: Props,
    _newProps: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): null | UpdatePayload {
    return true;
  },

  resetAfterCommit(_containerInfo: Container): void {
    // noop
  },

  resetTextContent(_instance: Instance): void {
    // noop
  },

  commitTextUpdate(
    _textInstance: TextInstance,
    _oldText: string,
    _newText: string
  ): void {
    throw new Error('commitTextUpdate should not be called');
  },

  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(
    _container: Container,
    _child: Instance | TextInstance
  ): void {
    if (dev) log.warn("'removeChildFromContainer' not supported");
  },

  insertBefore(
    _parentInstance: Instance,
    _child: Instance | TextInstance,
    _beforeChild: Instance | TextInstance
  ): void {
    if (dev) log.warn("'insertBefore' not supported");
  },

  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    return container.appendChild(child);
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    return parentInstance.appendChild(child);
  },

  shouldSetTextContent(_type: Type, props: Props): boolean {
    if (typeof props.children === 'string') return true;
    return false;
  },

  getRootHostContext(_rootContainerInstance: Container): HostContext {
    if (dev) log.warn("'getRootHostContext' not supported");
    return {};
  },

  getChildHostContext(
    _parentHostContext: HostContext,
    _type: Type,
    _rootContainerInstance: Container
  ): HostContext {
    if (dev) log.warn("'getChildHostContext' not supported");
    return {};
  },

  now: Date.now,

  commitUpdate(
    instance: Instance,
    _updatePayload: any,
    _type: string,
    _oldProps: Props,
    newProps: Props
  ): void {
    return instance.commitUpdate(newProps);
  },

  commitMount(instance: Instance, _type: Type, _newProps: Props): void {
    instance.commitMount();
  },

  shouldDeprioritizeSubtree(): boolean {
    return true;
  },

  scheduleDeferredCallback(
    callback?: () => any,
    _options?: { timeout: number }
  ): any {
    if (callback) {
      throw new Error(
        'Scheduling a callback twice is excessive. Instead, keep track of ' +
          'whether the callback has already been scheduled.'
      );
    }
  },

  cancelDeferredCallback(_callbackID: any): void {
    // noop
  },

  setTimeout(
    handler: (...args: any[]) => void,
    timeout: number
  ): TimeoutHandle | NoTimeout {
    return setTimeout(handler, timeout);
  },

  clearTimeout(handle: TimeoutHandle | NoTimeout): void {
    return clearTimeout(handle);
  },

  noTimeout: -1 as NoTimeout,

  isPrimaryRenderer: true,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false
});
