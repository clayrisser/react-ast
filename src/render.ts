import * as t from '@babel/types';
import generate from '@babel/generator';
import parserBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import { Options as PrettierOptions } from 'prettier';
import Renderer from '~/reconciler';
import { BundleType, Options } from '~/types';
import { File } from '~/elements';
import { dev } from '~/util';
import { updateContext } from '~/context';

export function renderAst(
  element: JSX.Element,
  options: Options = {},
  ast: t.File = t.file(t.program([]), [], [])
): t.File {
  updateContext({ parserOptions: options.parserOptions || {} });
  const file = new File();
  file.node = ast;
  const root = Renderer.createContainer(file, 0, false, null);
  Renderer.updateContainer(element, root, null, () => {
    // noop
  });
  Renderer.injectIntoDevTools({
    bundleType: Number(dev) as BundleType,
    rendererPackageName: 'react-ast',
    version: '0.2'
    // version: pkg.version
  });
  return file.node as t.File;
}

export function render(
  element: JSX.Element,
  options: Options = {},
  ast: t.File = t.file(t.program([]), [], [])
): string {
  options = {
    prettier: true,
    ...options
  };
  const { code } = generate(
    renderAst(element, options, ast),
    options.generatorOptions || {}
  );
  if (options.prettier) {
    return prettier.format(code, {
      ...(typeof options.prettier === 'boolean' ? {} : options.prettier),
      plugins: [
        parserBabel,
        ...((options?.prettier as PrettierOptions)?.plugins || [])
      ]
    });
  }
  return code;
}
