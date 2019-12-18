# react-ast

[![npm](https://img.shields.io/npm/v/react-ast.svg?style=flat-square)](https://www.npmjs.com/package/react-ast)
[![GitHub stars](https://img.shields.io/github/stars/codejamninja/react-ast.svg?style=social&label=Stars)](https://github.com/codejamninja/react-ast)

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

## Sponsored by Silicon Hills LLC and Nueve Solutions LLC

[![index](https://user-images.githubusercontent.com/6234038/71054254-f284ad80-2116-11ea-9013-d68306726854.jpeg)](https://nuevesolutions.com)
[![nuevesolutions_logo1-300x140](https://user-images.githubusercontent.com/6234038/71054134-725e4800-2116-11ea-9c3a-ba9ce59b8d00.png)](https://nuevesolutions.com)

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
import React from 'react';
import {
  ClassDeclaration,
  Code,
  FunctionDeclaration,
  Param,
  ReturnStatement,
  render
} from 'react-ast';

const code = render(
  <>
    <ClassDeclaration name="Hello" superClassName="Array">
      <Code>hello = 'world'</Code>
    </ClassDeclaration>
    <FunctionDeclaration
      name="add"
      params={[<Param key="a">a</Param>, <Param key="b">b</Param>]}
      returnStatement={<ReturnStatement>result</ReturnStatement>}
    >
      <Code>const result=a+b</Code>
    </FunctionDeclaration>
  </>
);

console.log(code);
```

The rendered code

```js
class Hello extends Array {
  hello = 'world';
}

function add(a, b) {
  const result = a + b;
  return result;
}
```

### Render AST

Sometimes you might want to render the ast instead of
rendering the code.

```ts
import React from 'react';
import {
  renderAst,
  Code,
  ClassDeclaration,
  FunctionDeclaration
} from 'react-ast';

const ast = renderAst(
  <ClassDeclaration name="Hello" superClassName="Array">
    <Code>const hello = 'world'</Code>
    <FunctionDeclaration name="foo">
      <Code>return 'bar'</Code>
    </FunctionDeclaration>
  </ClassDeclaration>
);

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

Submit an [issue](https://github.com/codejamninja/react-ast/issues/new)

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

Review the [guidelines for contributing](https://github.com/codejamninja/react-ast/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/codejamninja/react-ast/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2019

## Changelog

Review the [changelog](https://github.com/codejamninja/react-ast/blob/master/CHANGELOG.md)

## Credits

- [Jam Risser](https://codejam.ninja) - Author

## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
