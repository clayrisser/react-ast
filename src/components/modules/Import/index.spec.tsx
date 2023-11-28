import React from "react";
import { render } from "~/index";
import { ImportSpecifier } from "~/components";
import Import from "./index";

describe("<Import />", () => {
  it("renders with default specifier", () => {
    const code = render(<Import default="hello" from="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("import hello from 'world';");
  });

  it("renders with namespace specifier", () => {
    const code = render(<Import namespace="hello" from="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("import * as hello from 'world';");
  });

  it("renders with namespace specifier override", () => {
    const code = render(
      <Import
        namespace="hello"
        default="hello"
        imports="hello"
        from="world"
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import * as hello from 'world';");
  });

  it("renders with specifier", () => {
    const code = render(<Import imports="hello" from="world" debug />, {
      prettier: false,
    });
    expect(code).toBe("import { hello } from 'world';");
  });

  it("renders with imports", () => {
    const code = render(
      <Import
        imports={[
          <ImportSpecifier>hello</ImportSpecifier>,
          <ImportSpecifier>howdy</ImportSpecifier>,
        ]}
        from="world"
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import { hello, howdy } from 'world';");
  });

  it("renders with imports as string", () => {
    const code = render(
      <Import imports={["hello", "howdy"]} from="world" debug />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import { hello, howdy } from 'world';");
  });

  it("renders with imports and default specifier", () => {
    const code = render(
      <Import
        default="hello"
        imports={[<ImportSpecifier>howdy</ImportSpecifier>]}
        from="world"
        debug
      />,
      {
        prettier: false,
      },
    );
    expect(code).toBe("import hello, { howdy } from 'world';");
  });
});
