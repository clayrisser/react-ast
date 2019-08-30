declare namespace JSX {
  // @ts-ignore
  import { ReactNode } from 'react';
  import template, {
    TemplateBuilderOptions,
    PublicReplacements
    // @ts-ignore
  } from '@babel/template';
  // @ts-ignore
  import { Path } from '..';

  interface IntrinsicElements {
    Smart: {
      bodyPath?: Path;
      children?: ReactNode;
      code: string;
      options?: TemplateBuilderOptions;
      parentBodyPath?: Path;
      replacements?: PublicReplacements;
      scopePath?: Path;
    };
    Expression: {};
    File: {};
    Program: {};
  }
}
