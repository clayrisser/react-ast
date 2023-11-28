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
import Function from "./index";

describe("<Function />", () => {
  it("renders empty function", () => {
    const code = render(<Function name="hello" debug />, {
      prettier: false,
    });
    expect(code).toBe("function hello() {}");
  });

  it("renders anonymous function", () => {
    const code = render(<Function debug />, {
      prettier: false,
    });
    expect(code).toBe("function () {}");
  });

  it("renders function with nested return type", () => {
    const code = render(
      <Function
        name="hello"
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
    expect(code).toBe("function hello(): T<A, B> {}");
  });

  it("renders function with return type as string", () => {
    const code = render(
      <Function name="hello" returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("function hello(): T<A, B, C> {}");
  });

  it("renders function with nested children", () => {
    const code = render(
      <Function name="hello" debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </Function>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`function hello() {
  var v: T = "hello";
}`);
  });

  it("renders function with params as string", () => {
    const code = render(
      <Function name="hello" params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("function hello(a, b, c) {}");
  });

  it("renders function with children as string", () => {
    const code = render(
      <Function name="hello" debug>
        const hello = 0;
      </Function>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`function hello() {
  const hello = 0;
}`);
  });

  it("renders function with typed params", () => {
    const code = render(
      <Function
        name="hello"
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
    expect(code).toBe("function hello(a: A, b: T<A, B>, c: T<A, B, C>) {}");
  });

  it("renders function with all props", () => {
    const code = render(
      <Function
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="B">b</Identifier>,
        ]}
        name="hello"
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
      </Function>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`function hello(a: A, b: B): T<A, B> {
  var v: T = "hello";
}`);
  });

  it("renders empty arrow function", () => {
    const code = render(<Function arrow debug />, {
      prettier: false,
    });
    expect(code).toBe("() => {}");
  });

  it("renders arrow function with nested return type", () => {
    const code = render(
      <Function
        arrow
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
    expect(code).toBe("(): T<A, B> => {}");
  });

  it("renders arrow function with return type as string", () => {
    const code = render(<Function arrow returnType="T<A, B, C>" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("(): T<A, B, C> => {}");
  });

  it("renders arrow function with nested children", () => {
    const code = render(
      <Function arrow debug>
        <VariableDeclaration debug>
          <VariableDeclarator
            id="v"
            typeAnnotation={<TypeAnnotation>T</TypeAnnotation>}
            debug
          >
            hello
          </VariableDeclarator>
        </VariableDeclaration>
      </Function>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`() => {
  var v: T = "hello";
}`);
  });

  it("renders arrow function with params as string", () => {
    const code = render(<Function arrow params={["a", "b", "c"]} debug />, {
      prettier: false,
    });
    expect(code).toBe("(a, b, c) => {}");
  });

  it("renders arrow function with children as string", () => {
    const code = render(
      <Function arrow debug>
        const hello = 0;
      </Function>,
      {
        prettier: false,
      },
    );
    expect(code).toBe(`() => {
  const hello = 0;
}`);
  });

  it("renders arrow function with typed params", () => {
    const code = render(
      <Function
        arrow
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
    expect(code).toBe("(a: A, b: T<A, B>, c: T<A, B, C>) => {}");
  });

  it("renders arrow function with all props", () => {
    const code = render(
      <Function
        arrow
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="B">b</Identifier>,
        ]}
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
      </Function>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`(a: A, b: B): T<A, B> => {
  var v: T = "hello";
}`);
  });
});
