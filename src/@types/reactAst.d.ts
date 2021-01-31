declare namespace JSX {
  type Ref<T> = import('react').Ref<T>;
  type ReactNode = import('react').ReactNode;

  interface IntrinsicElements {
    File: {
      ref?: Ref<any>;
      children?: ReactNode;
    };
  }
}
