declare namespace JSX {
  type PublicReplacements = import("@babel/template").PublicReplacements;
  type ReactNode = import("react").ReactNode;
  type Ref<T> = import("react").Ref<T>;
  type TemplateBuilderOptions =
    import("@babel/template").TemplateBuilderOptions;

  interface DeepArray<T> extends Array<T | DeepArray<T>> {}

  type Path = string | number | DeepArray<string | number>;

  interface HashMap<T = any> {
    [key: string]: T;
  }

  interface IntrinsicElements {
    Ast: {
      ast: HashMap;
      bodyPath?: Path;
      children?: ReactNode;
      parentBodyPath?: Path;
      ref?: Ref<any>;
      scopePath?: Path;
    };
    ExpressionElement: {
      bodyPath?: Path;
      children?: ReactNode;
      code: string;
      options?: TemplateBuilderOptions;
      ref?: Ref<any>;
      replacements?: PublicReplacements;
    };
    File: {
      ref?: Ref<any>;
      children?: ReactNode;
    };
    Program: {
      ref?: Ref<any>;
    };
    SmartElement: {
      bodyPath?: Path;
      children?: ReactNode;
      code: string;
      deletePaths?: Path | Path[];
      options?: TemplateBuilderOptions;
      parentBodyPath?: Path;
      ref?: Ref<any>;
      replacements?: PublicReplacements;
      scopePath?: Path;
    };
  }
}
