import template, {
  TemplateBuilderOptions,
  PublicReplacements
} from '@babel/template';
import Element from './Element';
import { Props } from '../types';

/**
 * <Smart replacements={{}} options={{}} path="" bodyPath="">
 *   class Hello {}
 * </Smart>
 */
export default class Smart extends Element {
  propTypes: object;

  defaultProps: Props;

  constructor(props: Props = {}) {
    const code = '';
    const replacements: PublicReplacements = [];
    const templateBuilderOptions: TemplateBuilderOptions = {};
    super(template.smart(code, templateBuilderOptions)(replacements), props);
  }
}
