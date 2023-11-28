import React from "react";
import { ArrowFunctionExpression } from "~/components";
import { render } from "~/index";
import ExportDefaultDeclaration from "./index";

describe("<ExportDefaultDeclaration />", () => {
  it("renders with children", () => {
    const code = render(
      <ExportDefaultDeclaration debug>
        <ArrowFunctionExpression />
      </ExportDefaultDeclaration>,
      {
        prettier: false,
      },
    );
    expect(code).toBe("export default (() => {});");
  });
});
