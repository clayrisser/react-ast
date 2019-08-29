declare namespace JSX {
  interface IntrinsicElements {
    Smart: {
      bodyPath?: string;
      children?: object;
      code: string;
      options?: object;
      path?: string;
      replacements?: object;
    };
    Expression: {
      children: string;
      options?: object;
      path?: string;
      replacements?: object;
    };
    File: {};
    Program: {};
  }
}
