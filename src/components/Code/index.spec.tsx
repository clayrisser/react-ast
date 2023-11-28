import React from "react";
import { render } from "~/index";
import Code from "./index";

describe("<Code />", () => {
  it("renders", () => {
    const code = render(<Code debug>const hello = &apos;world&apos;</Code>, {
      prettier: false,
    });
    expect(code).toBe("const hello = 'world';");
  });

  it("renders with scope path", () => {
    const code = render(
      <Code scopePath="expression" debug>
        {"<></>"}
      </Code>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe("<></>");
  });
});
