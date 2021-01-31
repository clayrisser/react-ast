import ReactReconciler from 'react-reconciler';
import createElement from '~/createElement';
import { Smart } from '~/elements';
import { dev } from '~/util';
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
} from '~/types';

const logger = console;

// bindings to the react reconciliation lifecycle methods
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
    logger.debug('createInstance');
    return createElement(type, props);
  },

  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {
    logger.debug('appendInitialChild');
    parentInstance.appendChild(child);
  },

  finalizeInitialChildren(
    _parentInstance: Instance,
    _type: Type,
    _props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): boolean {
    logger.debug('finalizeInitialChildren');
    return true;
  },

  createTextInstance(
    text: string,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): TextInstance {
    logger.debug('createTextInstance');
    const label = new Smart({ code: text }, {});
    label.commitMount(); // prob should run at a later point
    return label;
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    logger.debug('getPublicInstance');
    return instance;
  },

  prepareForCommit(_containerInfo: Container): void {
    logger.debug('prepareForCommit');
  },

  prepareUpdate(
    _instance: Instance,
    _type: Type,
    _oldProps: Props,
    _newProps: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): null | UpdatePayload {
    logger.debug('prepareUpdate');
    return true;
  },

  resetAfterCommit(_containerInfo: Container): void {
    logger.debug('resetAfterCommit');
  },

  resetTextContent(_instance: Instance): void {
    logger.debug('resetTextContent');
    // noop
  },

  commitTextUpdate(
    _textInstance: TextInstance,
    _oldText: string,
    _newText: string
  ): void {
    logger.debug('commitTextUpdate');
    throw new Error('commitTextUpdate should not be called');
  },

  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('removeChild');
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(
    _container: Container,
    _child: Instance | TextInstance
  ): void {
    logger.debug('removeChildFromContainer');
    if (dev) logger.warn("'removeChildFromContainer' not supported");
  },

  insertBefore(
    _parentInstance: Instance,
    _child: Instance | TextInstance,
    _beforeChild: Instance | TextInstance
  ): void {
    logger.debug('insertBefore');
    if (dev) logger.warn("'insertBefore' not supported");
  },

  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    logger.debug('appendChildToContainer');
    container.appendChild(child);
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('appendChild');
    parentInstance.appendChild(child);
  },

  shouldSetTextContent(_type: Type, props: Props): boolean {
    logger.debug('shouldSetTextContent');
    if (typeof props.children === 'string') return true;
    return false;
  },

  getRootHostContext(_rootContainerInstance: Container): HostContext {
    logger.debug('getRootHostContext');
    if (dev) logger.warn("'getRootHostContext' not supported");
    return {};
  },

  getChildHostContext(
    _parentHostContext: HostContext,
    _type: Type,
    _rootContainerInstance: Container
  ): HostContext {
    logger.debug('getChildHostContext');
    if (dev) logger.warn("'getChildHostContext' not supported");
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
    logger.debug('commitUpdate');
    return instance.commitUpdate(newProps);
  },

  commitMount(instance: Instance, _type: Type, _newProps: Props): void {
    logger.debug('commitMount');
    instance.commitMount();
  },

  shouldDeprioritizeSubtree(): boolean {
    logger.debug('shouldDeprioritizeSubtree');
    return true;
  },

  scheduleDeferredCallback(
    callback?: () => any,
    _options?: { timeout: number }
  ): any {
    logger.debug('scheduleDeferredCallback');
    if (callback) {
      throw new Error(
        'Scheduling a callback twice is excessive. Instead, keep track of ' +
          'whether the callback has already been scheduled.'
      );
    }
  },

  cancelDeferredCallback(_callbackID: any): void {
    logger.debug('cancelDeferredCallback');
    // noop
  },

  setTimeout(
    handler: (...args: any[]) => void,
    timeout: number
  ): TimeoutHandle | NoTimeout {
    logger.debug('setTimeout');
    return setTimeout(handler, timeout);
  },

  clearTimeout(handle: TimeoutHandle | NoTimeout): void {
    logger.debug('clearTimeout');
    return clearTimeout(handle);
  },

  noTimeout: -1 as NoTimeout,

  isPrimaryRenderer: true,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false
});
