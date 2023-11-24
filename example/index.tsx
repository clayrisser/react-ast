import { ESLint } from 'eslint';
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
  StringLiteral,
  CallExpression
} from '~/index';

const logger = console;

const jsx = (
  <>
    <ClassDeclaration id="Hello" />
    <FunctionDeclaration id="add" params={['a', 'b']}>
      <VariableDeclaration kind={VariableDeclarationKind.Const}>
        <VariableDeclarator id="result">{0}</VariableDeclarator>
      </VariableDeclaration>
      <ReturnStatement>
        <Identifier>result</Identifier>
      </ReturnStatement>
    </FunctionDeclaration>
  </>
);

logger.log('======== RECONCILER LIFECYCLE ========');

const stringLiteral = (
  <StringLiteral ref={(r) => logger.log('R.NODE', r?.node)}>"HI"</StringLiteral>
);

// const renderedOutput = render(jsx);
// const renderedAst = renderAst(jsx);

// logger.log('\n\n======== jsx ========');

// logger.log(stringLiteral);

logger.log('\n\n======== RENDERED AST ========');
logger.log('Abstract syntax tree', renderAst(stringLiteral).program.body);

// logger.log(JSON.stringify(renderedAst, null, 2));
logger.log('\n\n======== RENDERED OUTPUT ========');
// logger.log('output', render(stringLiteral));

// logger.log(renderedOutput);
// logger.log('\n--------------');
