import React from "react";
import { render } from "~/index";
import { ArrowFunctionExpression } from "~/components";
import JSXAttribute from "./index";

describe("<JSXAttribute />", () => {
  it("renders", () => {
    const code = render(<JSXAttribute name="a" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("a");
  });

  it("renders with children", () => {
    const code = render(
      <JSXAttribute name="a" debug>
        <ArrowFunctionExpression />
      </JSXAttribute>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("a={() => {}}");
  });

  it("renders with children as string", () => {
    const code = render(
      <JSXAttribute name="a" debug>
        hello
      </JSXAttribute>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('a="hello"');
  });
});
