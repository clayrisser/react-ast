import React, { Component } from 'react';
import { Smart } from '../..';

export interface ImportDeclarationProps {
  name: string;
  source: string;
}

export class ImportDeclaration extends Component<ImportDeclarationProps> {
  render() {
    const code = `import ${this.props.name} from '${this.props.source}'`;
    return <Smart code={code} />;
  }
}
