import React from 'react';
import { ClassMethod } from './ClassMethod';
import { render, TypeAnnotation, TypeParam } from '../..';

describe('<ClassMethod />', () => {
  it('renders', () => {
    const code = render(<ClassMethod name="hello" />, { prettier: false });
    expect(code).toBe('hello() {}');
  });
});

describe('<ClassMethod static />', () => {
  it('renders', () => {
    const code = render(<ClassMethod static name="hello" />, {
      prettier: false
    });
    expect(code).toBe('static hello() {}');
  });
});

describe('<ClassMethod returnType="any" />', () => {
  it('renders', () => {
    const code = render(<ClassMethod name="hello" returnType="any" />, {
      prettier: false,
      parserOptions: {
        plugins: ['typescript']
      }
    });
    expect(code).toBe('hello(): any {}');
  });
});

describe('<ClassMethod static returnType="any" />', () => {
  it('renders', () => {
    const code = render(
      <ClassMethod
        static
        name="hello"
        returnType={
          <TypeAnnotation
            returnType
            params={[
              <TypeParam
                params={[<TypeParam params={['Texas']}>Howdy</TypeParam>]}
              >
                World
              </TypeParam>
            ]}
          >
            Hello
          </TypeAnnotation>
        }
      />,
      {
        prettier: false,
        parserOptions: {
          plugins: ['typescript']
        }
      }
    );
    expect(code).toBe('static hello(): Hello<World<Howdy<Texas>>> {}');
  });
});
