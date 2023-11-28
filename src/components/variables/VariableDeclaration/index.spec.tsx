import React from "react";
import {
  ArrowFunctionExpression,
  TypeAnnotation,
  VariableDeclarationKind,
  VariableDeclarator,
} from "~/components";
import { render } from "~/index";
import VariableDeclaration from "./index";

describe("<VariableDeclaration />", () => {
  it("renders", () => {
    const code = render(<VariableDeclaration debug />, {
      prettier: false,
    });
    expect(code).toBe("var ;");
  });

  it("renders as kind var", () => {
    const code = render(
      <VariableDeclaration kind={VariableDeclarationKind.Var} debug>
        <VariableDeclarator id="v" typeAnnotation="T" />
      </VariableDeclaration>,
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
      <VariableDeclaration kind={VariableDeclarationKind.Const} debug>
        <VariableDeclarator
          id="c"
          typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        />
      </VariableDeclaration>,
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
    const code = render(
      <VariableDeclaration kind={VariableDeclarationKind.Let} debug>
        <VariableDeclarator id="l" />
      </VariableDeclaration>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("let l;");
  });

  it("renders with children", () => {
    const code = render(
      <VariableDeclaration debug>
        <VariableDeclarator
          id="v"
          typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        >
          <ArrowFunctionExpression />
        </VariableDeclarator>
      </VariableDeclaration>,
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
      <VariableDeclaration debug>
        <VariableDeclarator
          id="v"
          typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
        >
          hello
        </VariableDeclarator>
      </VariableDeclaration>,
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
