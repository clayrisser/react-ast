import React from "react";
import { render } from "~/index";
import {
  ArrowFunctionExpression,
  Identifier,
  JSXAttribute,
} from "~/components";
import JSXOpeningElement from "./index";

describe("<JSXOpeningElement />", () => {
  it("renders", () => {
    const code = render(<JSXOpeningElement name="Hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello>");
  });

  it("renders self closing", () => {
    const code = render(<JSXOpeningElement name="Hello" selfClosing debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("<Hello />");
  });

  it("renders with attribute", () => {
    const code = render(
      <JSXOpeningElement
        name="Hello"
        attributes={<JSXAttribute name="a">a</JSXAttribute>}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('<Hello a="a">');
  });

  it("renders with attribute as string", () => {
    const code = render(
      <JSXOpeningElement name="Hello" attributes="a" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello a>");
  });

  it("renders with attributes as array", () => {
    const code = render(
      <JSXOpeningElement
        name="Hello"
        attributes={[
          <JSXAttribute name="a">a</JSXAttribute>,
          <JSXAttribute name="b">
            <Identifier>b</Identifier>
          </JSXAttribute>,
        ]}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('<Hello a="a" b={b}>');
  });

  it("renders with attributes as string array", () => {
    const code = render(
      <JSXOpeningElement name="Hello" attributes={["a", "b", "c"]} debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<Hello a b c>");
  });

  it("renders with attributes as object", () => {
    const code = render(
      <JSXOpeningElement
        name="Hello"
        attributes={{
          a: "a",
          b: <Identifier>b</Identifier>,
          c: <ArrowFunctionExpression />,
          d: true,
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
    expect(code).toBe('<Hello a="a" b={b} c={() => {}} d>');
  });
});
