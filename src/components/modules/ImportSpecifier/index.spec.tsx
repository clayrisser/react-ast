import React from "react";
import { render } from "~/index";
import ImportSpecifier from "./index";

describe("<ImportSpecifier />", () => {
  it("renders import specifier", () => {
    const code = render(<ImportSpecifier debug>hello</ImportSpecifier>, {
      prettier: false,
    });
    expect(code).toBe("hello");
  });

  it("renders import specifier with local", () => {
    const code = render(
      <ImportSpecifier local="world" debug>
        hello
      </ImportSpecifier>,
      {
        prettier: false,
      },
    );
    expect(code).toBe("hello as world");
  });
});
