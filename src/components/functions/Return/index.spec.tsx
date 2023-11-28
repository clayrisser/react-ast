import React from "react";
import { Identifier } from "~/components";
import { render } from "~/index";
import Return from "./index";

describe("<Return />", () => {
  it("renders return statement", () => {
    const code = render(<Return debug>{{ hello: "world" }}</Return>, {
      prettier: false,
    });
    expect(code).toBe(`return {
  "hello": "world"
};`);
  });

  it("renders return statement with children", () => {
    const code = render(
      <Return debug>
        <Identifier>hello</Identifier>
      </Return>,
      {
        prettier: false,
      },
    );
    expect(code).toBe("return hello;");
  });
});
