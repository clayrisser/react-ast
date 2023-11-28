import React from 'react';

import {
  ClassDeclaration,
  FunctionDeclaration,
  Identifier,
  ReturnStatement,
  VariableDeclaration,
  VariableDeclarationKind,
  VariableDeclarator,
  render,
  renderAst,
  AwaitExpression,
  // StringLiteral,
  // NumberLiteral,
  // ObjectLiteral,
  // Smart,
  CallExpression
  // StringLiteral,
  // Var,
  // Code
} from '~/index';

const logger = console;

// const jsx = (
//   <>
//     <ClassDeclaration id="Hello" />
//     <FunctionDeclaration id="add" params={['a', 'b']}>
//       <VariableDeclaration kind={VariableDeclarationKind.Const}>
//         <VariableDeclarator id="result">{0}</VariableDeclarator>
//       </VariableDeclaration>
//       <ReturnStatement>
//         <Identifier>result</Identifier>
//       </ReturnStatement>
//     </FunctionDeclaration>
//   </>
// );

logger.log('======== RECONCILER LIFECYCLE ========');

// const stringLiteral = (
//   <Var name="a">
//     <StringLiteral ref={(r) => logger.log('R.NODE', r?.node)}>a</StringLiteral>
//   </Var>
// );

// const numberLiteral = (
//   <NumberLiteral ref={(r) => logger.log('R.NODE', r?.node)}>{1}</NumberLiteral>
// );

// const objectLiteral = (
//   <ObjectLiteral ref={(r) => logger.log('R.NODE', r?.node)}>
//     {JSON.stringify({ a: 1 })}
//   </ObjectLiteral>
// );

// const callExpression = render(
//   <CallExpression name="fn" arguments={<StringLiteral>Hi</StringLiteral>} />,
//   { prettier: false }
// );

// logger.log('======== RENDER ========');
// logger.log(callExpression);

// logger.log(render(jsx, { prettier: false }));

// logger.log(render(jsx, { prettier: false }));

// logger.log(render(stringLiteral, { prettier: false }));
// logger.log(render(numberLiteral, { prettier: false }));
// logger.log(render(objectLiteral, { prettier: false }));

const fuc = (
  <FunctionDeclaration async id="getData" params={['url']}>
    <VariableDeclaration kind={VariableDeclarationKind.Const}>
      <VariableDeclarator id="result">
        <AwaitExpression>
          <CallExpression
            name="fetch"
            arguments={<Identifier>url</Identifier>}
          />
        </AwaitExpression>
      </VariableDeclarator>
    </VariableDeclaration>
  </FunctionDeclaration>
);

logger.log('======== RENDER AST ========');

logger.log(renderAst(fuc, { prettier: false }).program.body[0]);

logger.log('======== RENDER ========');
// logger.log(render(fuc, { prettier: false }));
