import * as t from '@babel/types';
import generate from '@babel/generator';
import prettier from 'prettier';
import pkg from '~/pkg';
import reconciler from '~/reconciler';
import { BundleType, Options } from '~/types';
import { File } from '~/elements';
import { dev } from '~/util';
import { updateContext } from '~/context';

export function renderAst(
  jsx: JSX.Element,
  options: Options = {},

  ast: t.File = t.file(t.program([]), [], [])
): t.File {
  updateContext({ parserOptions: options.parserOptions || {} });

  // create root element
  // a root node is already injected by this element constructor
  const rootElement = new File();
  rootElement.node = ast;

  // create root fiber
  const root = reconciler.createContainer(rootElement, false, false);

  // reconcile virtual dom
  reconciler.updateContainer(jsx, root, null, () => undefined);

  // add dev tools support
  reconciler.injectIntoDevTools({
    bundleType: Number(dev) as BundleType,
    rendererPackageName: pkg.name,
    version: pkg.version
  });

  // return rendered result (not required for side effect renderers)
  // in this case the rendered result is the node itself
  return rootElement.node as t.File;
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
  if (options.prettier === true) options.prettier = {};
  if (options.prettier) {
    options.prettier = {
      parser: 'babel',
      ...options.prettier
    };
  }
  const { code } = generate(
    renderAst(element, options, ast),
    options.generatorOptions || {}
  );
  if (options.prettier) {
    return prettier.format(
      code,
      typeof options.prettier === 'boolean' ? {} : options.prettier
    );
  }
  return code;
}
