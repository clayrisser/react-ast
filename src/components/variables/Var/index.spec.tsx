import React from "react";
import { ArrowFunctionExpression, TypeAnnotation, VarKind } from "~/components";
import { render } from "~/index";
import Var from "./index";

describe("<Var />", () => {
  it("renders", () => {
    const code = render(<Var name="v" debug />, {
      prettier: false,
    });
    expect(code).toBe("var v;");
  });

  it("renders as kind var", () => {
    const code = render(
      <Var kind={VarKind.Var} name="v" typeAnnotation="T" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("var v: T;");
  });

  it("renders as kind const", () => {
    const code = render(
      <Var
        kind={VarKind.Const}
        name="c"
        typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("const c: T;");
  });

  it("renders as kind let", () => {
    const code = render(<Var kind={VarKind.Let} name="l" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("let l;");
  });

  it("renders with children", () => {
    const code = render(
      <Var name="v" typeAnnotation={<TypeAnnotation>T</TypeAnnotation>} debug>
        <ArrowFunctionExpression />
      </Var>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("var v: T = () => {};");
  });

  it("renders with children as string", () => {
    const code = render(
      <Var name="v" typeAnnotation={<TypeAnnotation>T</TypeAnnotation>} debug>
        hello
      </Var>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe('var v: T = "hello";');
  });
});
