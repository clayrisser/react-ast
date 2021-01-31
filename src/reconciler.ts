import ReactReconciler from 'react-reconciler';
import createElement from '~/createElement';
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
    return false;
  },

  createTextInstance(
    _text: string,
    _rootContainerInstance: Container,
    _hostContext: HostContext
    // @ts-ignore
  ): TextInstance {
    logger.debug('createTextInstance');
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
  },

  commitTextUpdate(
    _textInstance: TextInstance,
    _oldText: string,
    _newText: string
  ): void {
    logger.debug('commitTextUpdate');
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
  },

  insertBefore(
    _parentInstance: Instance,
    _child: Instance | TextInstance,
    _beforeChild: Instance | TextInstance
  ): void {
    logger.debug('insertBefore');
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

  shouldSetTextContent(_type: Type, _props: Props): boolean {
    logger.debug('shouldSetTextContent');
    return false;
  },

  // @ts-ignore
  getRootHostContext(_rootContainerInstance: Container): HostContext {
    logger.debug('getRootHostContext');
  },

  getChildHostContext(
    _parentHostContext: HostContext,
    _type: Type,
    _rootContainerInstance: Container
    // @ts-ignore
  ): HostContext {
    logger.debug('getChildHostContext');
  },

  now: Date.now,

  commitUpdate(
    _instance: Instance,
    _updatePayload: any,
    _type: string,
    _oldProps: Props,
    _newProps: Props
  ): void {
    logger.debug('commitUpdate');
  },

  commitMount(_instance: Instance, _type: Type, _newProps: Props): void {
    logger.debug('commitMount');
  },

  shouldDeprioritizeSubtree(): boolean {
    logger.debug('shouldDeprioritizeSubtree');
    return false;
  },

  scheduleDeferredCallback(
    _callback?: () => any,
    _options?: { timeout: number }
  ): any {
    logger.debug('scheduleDeferredCallback');
  },

  cancelDeferredCallback(_callbackID: any): void {
    logger.debug('cancelDeferredCallback');
  },

  setTimeout(
    _handler: (...args: any[]) => void,
    _timeout: number
  ): TimeoutHandle | NoTimeout {
    logger.debug('setTimeout');
  },

  clearTimeout(_handle: TimeoutHandle | NoTimeout): void {
    logger.debug('clearTimeout');
  },

  noTimeout: -1 as NoTimeout,

  isPrimaryRenderer: true,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false
});
