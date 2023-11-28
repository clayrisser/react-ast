import React from "react";
import { render } from "~/index";
import {
  Identifier,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
} from "~/components";
import MethodSignature from "./index";

describe("<MethodSignature />", () => {
  it("renders empty method signature", () => {
    const code = render(<MethodSignature id="hello" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("hello();");
  });

  it("renders with nested return type", () => {
    const code = render(
      <MethodSignature
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
    expect(code).toBe("hello(): T<A, B>;");
  });

  it("renders with return type as string", () => {
    const code = render(
      <MethodSignature id="hello" returnType="T<A, B, C>" debug />,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("hello(): T<A, B, C>;");
  });

  it("renders with params as string", () => {
    const code = render(
      <MethodSignature id="hello" params={["a", "b", "c"]} debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello(a, b, c);");
  });

  it("renders with typed params", () => {
    const code = render(
      <MethodSignature
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
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("hello(a: A, b: T<A, B>, c: T<A, B, C>);");
  });

  it("renders with all props", () => {
    const code = render(
      <MethodSignature
        returnType="T<A, B>"
        params={[
          <Identifier typeAnnotation="A">a</Identifier>,
          <Identifier typeAnnotation="B">b</Identifier>,
        ]}
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
    expect(code).toBe("hello(a: A, b: B): T<A, B>;");
  });
});
