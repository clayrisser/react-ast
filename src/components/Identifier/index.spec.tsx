import React from 'react';
import { render, renderAst } from '~/index';
import {
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference
} from '~/components';
import Identifier from './index';

describe('<Identifier />', () => {
  it('renders', () => {
    const code = render(<Identifier debug>i</Identifier>, {
      prettier: false
    });
    expect(code).toBe('i');
  });

  it('renders with nested type annotation', () => {
    const code = renderAst(
      <Identifier
        typeAnnotation={
          <TypeAnnotation>
            <TypeReference name="T">
              <TypeParameterInstantiation>
                <TypeReference name="A" />
                <TypeReference name="B" />
              </TypeParameterInstantiation>
            </TypeReference>
          </TypeAnnotation>
        }
        debug
      >
        i
      </Identifier>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toMatchObject({
      program: {
        body: [
          {
            name: 'i',
            type: 'Identifier',
            typeAnnotation: {
              type: 'TSTypeAnnotation',
              typeAnnotation: {
                type: 'TSTypeReference',
                typeName: {
                  name: 'T',
                  type: 'Identifier'
                },
                typeParameters: {
                  params: [
                    {
                      type: 'TSTypeReference',
                      typeName: {
                        name: 'A',
                        type: 'Identifier'
                      }
                    },
                    {
                      type: 'TSTypeReference',
                      typeName: {
                        name: 'B',
                        type: 'Identifier'
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    });
  });

  it('renders with nested type annotation as string', () => {
    const code = renderAst(
      <Identifier typeAnnotation="T<A, B, C>" debug>
        i
      </Identifier>,
      {
        prettier: false,
        parserOptions: {
          plugins: ['jsx', 'classProperties', 'typescript']
        }
      }
    );
    expect(code).toMatchObject({
      program: {
        body: [
          {
            name: 'i',
            type: 'Identifier',
            typeAnnotation: {
              type: 'TSTypeAnnotation',
              typeAnnotation: {
                type: 'TSTypeReference',
                typeName: {
                  name: 'T',
                  type: 'Identifier'
                },
                typeParameters: {
                  params: [
                    {
                      type: 'TSTypeReference',
                      typeName: {
                        name: 'A',
                        type: 'Identifier'
                      }
                    },
                    {
                      type: 'TSTypeReference',
                      typeName: {
                        name: 'B',
                        type: 'Identifier'
                      }
                    },
                    {
                      type: 'TSTypeReference',
                      typeName: {
                        name: 'C',
                        type: 'Identifier'
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    });
  });
});
