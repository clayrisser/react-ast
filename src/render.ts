import * as t from '@babel/types';
import generate, { GeneratorOptions } from '@babel/generator';
import pkg from 'npm-pkg-json';
import Renderer from './reconciler';
import dev from './dev';
import { BundleType } from './types';
import { File } from './elements';

export function renderAst(
  element: JSX.Element,
  ast: t.File = t.file(t.program([]), [], [])
): t.File {
  const file = new File();
  file.node = ast;
  const root = Renderer.createContainer(file, false, false);
  Renderer.updateContainer(element, root, null, () => {
    // noop
  });
  Renderer.injectIntoDevTools({
    bundleType: Number(dev) as BundleType,
    rendererPackageName: pkg.name,
    version: pkg.version
  });
  return file.node as t.File;
}

export function render(
  element: JSX.Element,
  ast: t.File = t.file(t.program([]), [], []),
  generatorOptions: GeneratorOptions = {}
): string {
  return generate(renderAst(element, ast), generatorOptions).code;
}
