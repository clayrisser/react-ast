import React from 'react';
import { render } from '~/index';
import FunctionalComponent from './index';

describe('<FunctionalComponent />', () => {
  it('renders functional component', () => {
    const code = render(<FunctionalComponent name="Hello" />, {
      prettier: false,
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      }
    });
    expect(code).toBe(`import React, { FC } from 'react'

export interface HelloProps {}

const Hello: FC<HelloProps> = (props: HelloProps) => {
  return <></>;
}

Hello.defaultProps = {}

export default Hello
`);
  });
});
