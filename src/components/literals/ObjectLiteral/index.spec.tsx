import React from "react";
import { render, ObjectLiteral, CallExpression, Var } from "~/index";

describe("<ObjectLiteral />", () => {
  it("renders object", () => {
    const code = render(
      <ObjectLiteral debug>{JSON.stringify({ a: 1 })}</ObjectLiteral>,
      { prettier: false },
    );
    expect(code).toBe('{\n  "a": 1\n}');
  });

  it("renders object in call expression", () => {
    const code = render(
      <CallExpression
        name="test"
        debug
        arguments={[<ObjectLiteral>{JSON.stringify({ a: 1 })}</ObjectLiteral>]}
      />,
      { prettier: false },
    );
    expect(code).toBe('test({\n  "a": 1\n})');
  });

  it("renders object in variable", () => {
    const code = render(
      <Var name="test">
        <ObjectLiteral>{JSON.stringify({ a: 1 })}</ObjectLiteral>
      </Var>,
      { prettier: false },
    );
    expect(code).toBe('var test = {\n  "a": 1\n};');
  });
});
