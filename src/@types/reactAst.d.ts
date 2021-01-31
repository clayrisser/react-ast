declare namespace JSX {
  type PublicReplacements = import('@babel/template').PublicReplacements;
  type ReactNode = import('react').ReactNode;
  type Ref<T> = import('react').Ref<T>;
  type TemplateBuilderOptions = import('@babel/template').TemplateBuilderOptions;

  interface DeepArray<T> extends Array<T | DeepArray<T>> {}

  type Path = string | number | DeepArray<string | number>;

  interface IntrinsicElements {
    Ast: {
      ref?: Ref<any>;
    };
    Expression: {
      ref?: Ref<any>;
    };
    File: {
      ref?: Ref<any>;
      children?: ReactNode;
    };
    Program: {
      ref?: Ref<any>;
    };
    Smart: {
      bodyPath?: Path;
      children?: ReactNode;
      code: string;
      options?: TemplateBuilderOptions;
      parentBodyPath?: Path;
      ref?: Ref<any>;
      replacements?: PublicReplacements;
      scopePath?: Path;
    };
  }
}
