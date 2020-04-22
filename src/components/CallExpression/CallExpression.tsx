import React, { Component, ReactNode } from 'react';
import { oc } from 'ts-optchain.macro';
import { Smart, Argument } from '../..';

export interface CallExpressionProps {
  name: string;
  arguments?: ReactNode | number | string;
}

export class CallExpression extends Component<CallExpressionProps> {
  renderArguments() {
    return oc(this.props)
      .arguments([])
      .map((argument: ReactNode) => {
        if (typeof argument === 'string') {
          return <Argument key={argument}>{argument}</Argument>;
        }
        return argument;
      });
  }

  render() {
    const code = `${this.props.name}()`;
    return (
      <Smart
        code={code}
        ref={(a: any) => console.log(a.node)}
        scopePath="expression"
      >
        {this.renderArguments()}
      </Smart>
    );
  }
}
