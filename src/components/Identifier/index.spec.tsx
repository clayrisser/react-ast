/**
 * File: /src/components/Identifier/index.spec.tsx
 * Project: react-ast
 * File Created: 28-11-2023 15:04:04
 * Author: dharmendra
 * -----
 * BitSpur (c) Copyright 2019 - 2023
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { render, renderAst } from "../../index";
import {
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference,
} from "../../components";
import Identifier from "./index";

describe("<Identifier />", () => {
  it("renders", () => {
    const code = render(<Identifier debug>i</Identifier>, {
      prettier: false,
    });
    expect(code).toBe("i");
  });

  it("renders with nested type annotation", () => {
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
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toMatchObject({
      program: {
        body: [
          {
            name: "i",
            type: "Identifier",
            typeAnnotation: {
              type: "TSTypeAnnotation",
              typeAnnotation: {
                type: "TSTypeReference",
                typeName: {
                  name: "T",
                  type: "Identifier",
                },
                typeParameters: {
                  params: [
                    {
                      type: "TSTypeReference",
                      typeName: {
                        name: "A",
                        type: "Identifier",
                      },
                    },
                    {
                      type: "TSTypeReference",
                      typeName: {
                        name: "B",
                        type: "Identifier",
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    });
  });

  it("renders with nested type annotation as string", () => {
    const code = renderAst(
      <Identifier typeAnnotation="T<A, B, C>" debug>
        i
      </Identifier>,
      {
        prettier: false,
        parserOptions: {
          plugins: ["jsx", "classProperties", "typescript"],
        },
      },
    );
    expect(code).toMatchObject({
      program: {
        body: [
          {
            name: "i",
            type: "Identifier",
            typeAnnotation: {
              type: "TSTypeAnnotation",
              typeAnnotation: {
                type: "TSTypeReference",
                typeName: {
                  name: "T",
                  type: "Identifier",
                },
                typeParameters: {
                  params: [
                    {
                      type: "TSTypeReference",
                      typeName: {
                        name: "A",
                        type: "Identifier",
                      },
                    },
                    {
                      type: "TSTypeReference",
                      typeName: {
                        name: "B",
                        type: "Identifier",
                      },
                    },
                    {
                      type: "TSTypeReference",
                      typeName: {
                        name: "C",
                        type: "Identifier",
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    });
  });
});
