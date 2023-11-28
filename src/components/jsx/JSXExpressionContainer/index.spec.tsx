import React from "react";
import { ArrowFunctionExpression } from "~/components";
import { render } from "~/index";
import JSXExpressionContainer from "./index";

describe("<JSXExpressionContainer />", () => {
  it("renders empty", () => {
    const code = render(<JSXExpressionContainer debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("{}");
  });

  it("renders with children example", () => {
    const code = render(
      <JSXExpressionContainer debug>
        <ArrowFunctionExpression />
      </JSXExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("{() => {}}");
  });

  it("renders with children as string", () => {
    const code = render(
      <JSXExpressionContainer debug>hello</JSXExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('{"hello"}');
  });

  it("renders with children as number", () => {
    const code = render(
      <JSXExpressionContainer debug>{0}</JSXExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("{0}");
  });

  it("renders with children as object", () => {
    const code = render(
      <JSXExpressionContainer debug>
        {{ hello: "world" }}
      </JSXExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`{{
  "hello": "world"
}}`);
  });

  it("renders with children as array", () => {
    const code = render(
      <JSXExpressionContainer debug>{[1, 2, 3]}</JSXExpressionContainer>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("{[1, 2, 3]}");
  });
});
