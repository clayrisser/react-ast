import React from 'react';
import { Literal } from './Literal';
import { render, Options } from '../..';

const options: Options = {
  parserOptions: {
    plugins: ['jsx']
  },
  prettier: false
};

describe('<Literal />', () => {
  it('renders array', () => {
    const code = render(<Literal>{[1, 2, 3]}</Literal>, options);
    expect(code).toBe('[1, 2, 3]');
  });

  it('renders object', () => {
    const code = render(<Literal>{{ hello: 'world' }}</Literal>, options);
    expect(code).toBe('{\n  "hello": "world"\n}');
  });

  it('renders string', () => {
    const code = render(<Literal>hello</Literal>, options);
    expect(code).toBe("'hello'");
  });

  it('renders number', () => {
    const code = render(<Literal>{88}</Literal>, options);
    expect(code).toBe('88');
  });

  it('renders boolean', () => {
    const code = render(<Literal>{true}</Literal>, options);
    expect(code).toBe('true');
  });
});
