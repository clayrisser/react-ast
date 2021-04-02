# react-ast

[![npm](https://img.shields.io/npm/v/react-ast.svg?style=flat-square)](https://www.npmjs.com/package/react-ast)
[![GitHub stars](https://img.shields.io/github/stars/clayrisser/react-ast.svg?style=social&label=Stars)](https://github.com/clayrisser/react-ast)

> render abstract syntax trees using react

Please ★ this repo if you found it useful ★ ★ ★

Abstract syntax trees are difficult to work with by nature. This is a react renderer
that makes interacting with abstract syntax trees and rendering code a breeze.

React AST is the ultimate meta programming tool that uses react to render abstract
syntax trees. It can be used to build powerful unopinionated code generators and babel
plugins that are easy to read and can scale without creating a rats nest of unreadable
code.

You can read a post I wrote about this project at the link below.

[Render Abstract Syntax Trees with React](https://dev.to/codejamninja/render-abstract-syntax-trees-with-react-349j)

## Built by Silicon Hills LLC

[![index](https://user-images.githubusercontent.com/6234038/71054254-f284ad80-2116-11ea-9013-d68306726854.jpeg)](https://nuevesolutions.com)

Silicon Hills offers premium Node and React develpoment and support services. Get in touch at [nuevesolutions.com](https://nuevesolutions.com).

## Features

- works with babel ast
- supports typescript

## Installation

```sh
npm install --save react-ast
```

## Dependencies

- [NodeJS](https://nodejs.org)

## Usage

### Render Code

```ts
import React, { FC } from 'react';
import {
  Export,
  Expression,
  Function,
  Identifier,
  Import,
  Interface,
  JSX,
  ReactNode,
  Return,
  TypeAnnotation,
  TypeReference,
  Var,
  VarKind
} from 'react-ast';

const code = render(
  <>
    <Import default="React" imports={['FC']} from="react" />
    <Export>
      <Interface name="HelloProps" />
    </Export>
    <Var kind={VarKind.Const} typeAnnotation="FC<HelloProps>" name="Hello">
      <Function
        arrow
        params={[
          <Identifier
            typeAnnotation={
              <TypeAnnotation>
                <TypeReference name="HelloProps" />
              </TypeAnnotation>
            }
          >
            props
          </Identifier>
        ]}
      >
        <Return>
          <JSX />
        </Return>
      </Function>
    </Var>
    <Expression properties="Hello.defaultProps">{{}}</Expression>
    <Export default>
      <Identifier>Hello</Identifier>
    </Export>
  </>
);

console.log(code);
```

The rendered code

```ts
import React, { FC } from 'react';
export interface HelloProps {}

const Hello: FC<HelloProps> = (props: HelloProps) => {
  return <></>;
};

Hello.defaultProps = {};
export default Hello;
```

### Render AST

Sometimes you might want to render the ast instead of
rendering the code.

```ts
import React from 'react';
import { ClassDeclaration, renderAst } from 'react-ast';

const ast = renderAst(<Class name="Hello" />);

console.log(ast);
```

The rendered AST

```js
{ type: 'File',
  program:
   { type: 'Program',
     body: [ [Object] ],
     directives: [],
     sourceType: 'script',
     interpreter: null },
  comments: [],
  tokens: [] }
```

## Support

Submit an [issue](https://github.com/clayrisser/react-ast/issues/new)

## Development

You can validate the AST at [astexplorer.net](https://astexplorer.net/) with the following settings.

| Language     | ParserSettings | Transform |
| ------------ | -------------- | --------- |
| `JavaScript` | `babylon7`     | `babelv7` |

Enabled the following **babylon7** plugins

- `jsx`
- `typescript`
- `asyncGenerators`
- `classProperties`
- `decorators`
- `doExpressions`
- `dynamicImport`
- `functionBind`
- `functionSent`
- `numericSeparator`
- `objectRestSpread`
- `optionalCatchBinding`
- `optionalChaining`

## Contributing

Review the [guidelines for contributing](https://github.com/clayrisser/react-ast/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/clayrisser/react-ast/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2019

## Changelog

Review the [changelog](https://github.com/clayrisser/react-ast/blob/master/CHANGELOG.md)

## Credits

- [Jam Risser](https://codejam.ninja) - Author

## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/clayrisser/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/clayrisser.svg?style=flat-square)](https://liberapay.com/clayrisser/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/clayrisser.svg?style=flat-square)](https://liberapay.com/clayrisser/donate)
