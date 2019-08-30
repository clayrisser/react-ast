declare namespace JSX {
  interface IntrinsicElements {
    Smart: {
      bodyPath?: any;
      children?: object;
      code: string;
      options?: object;
      path?: string;
      ref?: (node: object) => any;
      replacements?: object;
      scopePath?: any;
    };
    Expression: {};
    File: {};
    Program: {};
  }
}
