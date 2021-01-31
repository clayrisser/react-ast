import React from 'react';
import { render } from '~/index';

describe('render(<Jsx />)', () => {
  it('should render jsx', async () => {
    expect(render(<></>)).toMatchObject({ hello: 'world' });
  });
});

export default null;
