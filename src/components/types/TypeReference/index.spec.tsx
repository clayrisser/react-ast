import React from "react";
import { TypeParameterInstantiation } from "~/components";
import { render } from "~/index";
import TypeAnnotation from "./index";

describe("<TypeAnnotation />", () => {
  it("renders with children", () => {
    const code = render(<TypeAnnotation name="T" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("T");
  });

  it("renders with nested children", () => {
    const code = render(
      <TypeAnnotation name="T" debug>
        <TypeParameterInstantiation>
          <TypeAnnotation name="A" debug />
          <TypeAnnotation name="B" debug />
        </TypeParameterInstantiation>
      </TypeAnnotation>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("T<A, B>");
  });

  it("renders with children as string", () => {
    const code = render(<TypeAnnotation name="T<A>" debug />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe("T<A>");
  });
});
