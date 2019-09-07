import React from 'react';
import { JsxElement } from './JsxElement';
import { render, Literal } from '../..';

describe('<JsxElement />', () => {
  it('renders jsx', () => {
    const code = render(<JsxElement name="Hello" />, {
      parserOptions: {
        plugins: ['jsx']
      }
    });
    expect(code).toBe('<Hello />');
  });

  it('renders jsx with attributes', () => {
    const code = render(
      <JsxElement name="Hello" attributes={{ one: true }} />,
      {
        parserOptions: {
          plugins: ['jsx']
        }
      }
    );
    expect(code).toBe('<Hello one />');
  });
});

describe('<JsxElement>{children}</JsxElement>', () => {
  it('renders jsx with jsx children', () => {
    const code = render(
      <JsxElement name="Hello">
        <JsxElement name="World" />
      </JsxElement>,
      {
        parserOptions: {
          plugins: ['jsx']
        }
      }
    );
    expect(code).toBe('<Hello><World /></Hello>');
  });

  it('renders jsx with literal string children', () => {
    const code = render(
      <JsxElement name="Hello">
        <Literal>world</Literal>
      </JsxElement>,
      {
        parserOptions: {
          plugins: ['jsx']
        }
      }
    );
    expect(code).toBe("<Hello>{'world'}</Hello>");
  });

  it('renders jsx with string children', () => {
    const code = render(<JsxElement name="Hello"> world </JsxElement>, {
      parserOptions: {
        plugins: ['jsx']
      }
    });
    expect(code).toBe('<Hello>world</Hello>');
  });

  it('renders jsx with boolean children', () => {
    const code = render(<JsxElement name="Hello">{true}</JsxElement>, {
      parserOptions: {
        plugins: ['jsx']
      }
    });
    expect(code).toBe('<Hello>{true}</Hello>');
  });

  it('renders jsx with number children', () => {
    const code = render(<JsxElement name="Hello">{88}</JsxElement>, {
      parserOptions: {
        plugins: ['jsx']
      }
    });
    expect(code).toBe('<Hello>{88}</Hello>');
  });

  it('renders jsx with object children', () => {
    const code = render(
      <JsxElement name="Hello">{{ hello: 'world' }}</JsxElement>,
      {
        parserOptions: {
          plugins: ['jsx']
        }
      }
    );
    expect(code).toBe('<Hello>{{\n    "hello": "world"\n  }}</Hello>');
  });

  it('renders jsx with array children', () => {
    const code = render(<JsxElement name="Hello">{[1, 2, 3]}</JsxElement>, {
      parserOptions: {
        plugins: ['jsx']
      }
    });
    expect(code).toBe('<Hello>{[1, 2, 3]}</Hello>');
  });
});
