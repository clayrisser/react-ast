import React from "react";
import { JSX } from "~/components";
import { render } from "~/index";
import FunctionalComponent from "./index";

describe("<FunctionalComponent />", () => {
  it("renders functional component", () => {
    const code = render(<FunctionalComponent name="Hello" />, {
      prettier: false,
      parserOptions: {
        plugins: ["jsx", "classProperties", "typescript"],
      },
    });
    expect(code).toBe(`import React, { FC } from 'react';
export interface HelloProps {}

const Hello: FC<HelloProps> = (props: HelloProps) => {
  return <></>;
};

Hello.defaultProps = {}
export default Hello;`);
  });

  it("renders functional component with children", () => {
    const code = render(
      <FunctionalComponent name="Hello">
        <JSX>
          <JSX name="Hello" />
        </JSX>
      </FunctionalComponent>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toBe(`import React, { FC } from 'react';
export interface HelloProps {}

const Hello: FC<HelloProps> = (props: HelloProps) => {
  return <><Hello /></>;
};

Hello.defaultProps = {}
export default Hello;`);
  });
});
