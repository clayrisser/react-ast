import Element from './elements/Element';
import Renderer from './reconciler';
import dev from './dev';
import pkg from './pkg';
import { BundleType } from './types';
import { File } from './elements';

export default function render(element: Element) {
  const file = new File();
  const root = Renderer.createContainer(file, false, false);
  Renderer.updateContainer(element, root, null, () => {});
  Renderer.injectIntoDevTools({
    bundleType: Number(dev) as BundleType,
    rendererPackageName: pkg.name,
    version: pkg.version
  });
}
