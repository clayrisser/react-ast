import React from "react";
import { Identifier, ArrowFunctionExpression } from "~/components";
import { render } from "~/index";
import JSXElement from "./index";

describe("<JSXElement />", () => {
  it("renders jsx element", () => {
    const code = render(<JSXElement name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello />");
  });

  it("renders jsx element with no name", () => {
    const code = render(<JSXElement debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<></>");
  });

  it("force no self closing", () => {
    const code = render(<JSXElement name="Hello" selfClosing={false} debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello></Hello>");
  });

  it("renders jsx no name with children", () => {
    const code = render(
      <JSXElement debug>
        <JSXElement name="World" />
      </JSXElement>,

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
      <JSXElement name="Hello" debug>
        <JSXElement name="World" />
      </JSXElement>,

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
      <JSXElement name="Hello" selfClosing debug>
        <JSXElement name="World" />
      </JSXElement>,
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
      <JSXElement
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
      <JSXElement
        name="Hello"
        attributes={{
          a: <Identifier>a</Identifier>,
          b: "b",
          c: true,
          d: <ArrowFunctionExpression />,
        }}
        debug
      >
        <JSXElement
          name="World"
          attributes={{
            a: <Identifier>a</Identifier>,
            b: "b",
            c: true,
            d: <ArrowFunctionExpression />,
          }}
          debug
        />
      </JSXElement>,
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
