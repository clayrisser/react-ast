import React from "react";
import { Identifier, ArrowFunctionExpression } from "~/components";
import { render } from "~/index";
import JSX from "./index";

describe("<JSX />", () => {
  it("renders jsx element", () => {
    const code = render(<JSX name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello />");
  });

  it("renders jsx element with no name", () => {
    const code = render(<JSX debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<></>");
  });

  it("force no self closing", () => {
    const code = render(<JSX name="Hello" selfClosing={false} debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello></Hello>");
  });

  it("renders jsx no name with children", () => {
    const code = render(
      <JSX debug>
        <JSX name="World" />
      </JSX>,

      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<><World /></>");
  });

  it("renders jsx element with children", () => {
    const code = render(
      <JSX name="Hello" debug>
        <JSX name="World" />
      </JSX>,

      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello><World /></Hello>");
  });

  it("disable force self closing with children", () => {
    const code = render(
      <JSX name="Hello" selfClosing debug>
        <JSX name="World" />
      </JSX>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello><World /></Hello>");
  });

  it("renders jsx element with attributes", () => {
    const code = render(
      <JSX
        name="Hello"
        attributes={{
          a: <Identifier>a</Identifier>,
          b: "b",
          c: true,
          d: <ArrowFunctionExpression />,
        }}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('<Hello a={a} b="b" c d={() => {}} />');
  });

  it("renders jsx element with attributes and children", () => {
    const code = render(
      <JSX
        name="Hello"
        attributes={{
          a: <Identifier>a</Identifier>,
          b: "b",
          c: true,
          d: <ArrowFunctionExpression />,
        }}
        debug
      >
        <JSX
          name="World"
          attributes={{
            a: <Identifier>a</Identifier>,
            b: "b",
            c: true,
            d: <ArrowFunctionExpression />,
          }}
          debug
        />
      </JSX>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(
      '<Hello a={a} b="b" c d={() => {}}><World a={a} b="b" c d={() => {}} /></Hello>',
    );
  });
});
