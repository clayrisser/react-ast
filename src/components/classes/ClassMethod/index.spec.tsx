import React from "react";
import { render } from "~/index";
import {
  Identifier,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
  VariableDeclaration,
  VariableDeclarator,
} from "~/components";
import ClassMethod, { ClassMethodAccessibility } from "./index";

describe("<ClassMethod />", () => {
  it("renders empty method", () => {
    const code = render(<ClassMethod id="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("hello() {}");
  });

  it("renders with static", () => {
    const code = render(<ClassMethod static id="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("static hello() {}");
  });

  it("renders with accessibility", () => {
    const code = render(
      <ClassMethod
        id="hello"
        accessibility={ClassMethodAccessibility.Private}
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("private hello() {}");
  });

  it("renders with static accessibility", () => {
    const code = render(
      <ClassMethod
        static
        accessibility={ClassMethodAccessibility.Private}
        id="hello"
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("private static hello() {}");
  });

  it("renders with nested return type", () => {
    const code = render(
      <ClassMethod
        id="hello"
        returnType={
          <TypeAnnotation>
            <TypeReference name="T">
              <TypeParameterInstantiation>
                <TypeReference name="A" />
                <TypeReference name="B" />
              </TypeParameterInstantiation>
            </TypeReference>
          </TypeAnnotation>
        }
        debug
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("hello(): T<A, B> {}");
  });

  it("renders with return type as string", () => {
    const code = render(
      <ClassMethod id="hello" returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("hello(): T<A, B, C> {}");
  });

  it("renders with nested children", () => {
    const code = render(
      <ClassMethod id="hello" debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </ClassMethod>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`hello() {
  var v: T = "hello";
}`);
  });

  it("renders with params as string", () => {
    const code = render(
      <ClassMethod id="hello" params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello(a, b, c) {}");
  });

  it("renders with children as string", () => {
    const code = render(
      <ClassMethod id="hello" debug>
        const hello = 0;
      </ClassMethod>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`hello() {
  const hello = 0;
}`);
  });

  it("renders with typed params", () => {
    const code = render(
      <ClassMethod
        id="hello"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="T<A, B>">b</Identifier>,
          <Identifier
            typeAnnotation={
              <TypeAnnotation>
                <TypeReference name="T">
                  <TypeParameterInstantiation>
                    <TypeReference name="A" />
                    <TypeReference name="B" />
                    <TypeReference name="C" />
                  </TypeParameterInstantiation>
                </TypeReference>
              </TypeAnnotation>
            }
          >
            c
          </Identifier>,
        ]}
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello(a: A, b: T<A, B>, c: T<A, B, C>) {}");
  });

  it("renders with all props", () => {
    const code = render(
      <ClassMethod
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="B">b</Identifier>,
        ]}
        id="hello"
        debug
      >
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </ClassMethod>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`hello(a: A, b: B): T<A, B> {
  var v: T = "hello";
}`);
  });
});
