import React, { Component } from 'react';
import { oc } from 'ts-optchain.macro';
import { Smart } from '../..';

export interface ImportDeclarationProps {
  defaultExport?: string;
  exports?: string[];
  source: string;
}

export class ImportDeclaration extends Component<ImportDeclarationProps> {
  render() {
    const exports = oc(this.props).exports([]);
    const code = `import ${
      this.props.defaultExport
        ? `${this.props.defaultExport}${exports.length ? ',' : ''} `
        : ''
    }${exports.length ? `{${exports.join(',')}} ` : ''}from '${
      this.props.source
    }'`;
    return <Smart code={code} />;
  }
}
