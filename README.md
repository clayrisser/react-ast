# react-ast

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/react-ast.svg?style=social&label=Stars)](https://github.com/codejamninja/react-ast)

> render abstract syntax trees using react

Please ★ this repo if you found it useful ★ ★ ★

Abstract syntax trees are difficult to work with by nature. This is a react renderer
that makes interacting with abstract syntax trees and rendering code a breeze.

React AST is the ultimate meta programming tool that uses react to render abstract
syntax trees. It can be used to build powerful unopinionated code generators and babel
plugins that are easy to read and can scale without creating a rats nest of unreadable
code.

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
import { render, Code, Class, Function } from '../src';

const code = render(
  <Class name="Hello">
    <Code>const hello = 'world'</Code>
    <Function name="foo">
      <Code>return 'bar'</Code>
    </Function>
  </Class>
);

console.log(code);
```

The rendered code

```js
class Hello {
  const hello = 'world';

  function foo() {
    return 'bar';
  }

}
```

### Render AST

Sometimes you might want to render the ast instead of
rendering the code.

```ts
import React from 'react';
import { renderAst, Code, Class, Function } from '../src';

const ast = renderAst(
  <Class name="Hello">
    <Code>const hello = 'world'</Code>
    <Function name="foo">
      <Code>return 'bar'</Code>
    </Function>
  </Class>
);

console.log(ast);
```

## Support

Submit an [issue](https://github.com/codejamninja/react-ast/issues/new)

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
