import React from 'react';
import { render, Smart } from '~/index';

describe('render(<Jsx />)', () => {
  it('should render code', async () => {
    expect(
      render(
        <>
          <Smart code="const hello = 'world'" />
          {"const howdy = () => 'texas'"}
        </>
      )
    ).toBe(`const hello = "world";

const howdy = () => "texas";
`);
  });
});

export default null;
