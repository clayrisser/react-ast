import React from "react";
import { render, NumberLiteral, CallExpression, Var } from "~/index";

describe("<NumberLiteral />", () => {
  it("render number literal", () => {
    const code = render(<NumberLiteral>{1}</NumberLiteral>, {
      prettier: false,
    });
    expect(code).toBe("1");
  });

  it("renders number literal inside function argument", () => {
    const code = render(
      <CallExpression
        name="fn"
        arguments={<NumberLiteral>{1}</NumberLiteral>}
      />,
      { prettier: false },
    );
    expect(code).toBe("fn(1)");
  });

  it("renders a code and using number literal", () => {
    const code = render(
      <Var name="age">
        <NumberLiteral>{25}</NumberLiteral>
      </Var>,
      { prettier: false },
    );
    expect(code).toBe("var age = 25;");
  });
});
