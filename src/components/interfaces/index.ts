/*
 *  File: /src/components/interfaces/index.ts
 *  Project: react-ast
 *  File Created: 28-11-2023 12:59:07
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2019 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import ExpressionWithTypeArguments from "./ExpressionWithTypeArguments";
import Interface from "./Interface";
import InterfaceDeclaration from "./InterfaceDeclaration";
import InterfaceTypeReference from "./InterfaceTypeReference";
import MethodSignature from "./MethodSignature";
import PropertySignature from "./PropertySignature";

export {
  ExpressionWithTypeArguments,
  Interface,
  InterfaceDeclaration,
  InterfaceTypeReference,
  MethodSignature,
  PropertySignature,
};

export * from "./ExpressionWithTypeArguments";
export * from "./Interface";
export * from "./InterfaceDeclaration";
export * from "./InterfaceTypeReference";
export * from "./MethodSignature";
export * from "./PropertySignature";
