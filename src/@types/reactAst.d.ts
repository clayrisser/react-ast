declare namespace JSX {
  type Ref<T> = import('react').Ref<T>;
  type ReactNode = import('react').ReactNode;

  interface IntrinsicElements {
    Hello: {
      ref?: Ref<any>;
    };
    Howdy: {
      ref?: Ref<any>;
    };
    Wrapper: {
      ref?: Ref<any>;
      children?: ReactNode;
    };
  }
}
