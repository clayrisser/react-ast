import File from './File';
import { IElement } from './BaseElement';

export interface Elements {
  [key: string]: IElement;
}

export { File };
export default { File } as Elements;
