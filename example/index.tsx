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
