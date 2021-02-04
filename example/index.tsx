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
  renderAst
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

const renderedOutput = render(jsx);
const renderedAst = renderAst(jsx);

logger.log('\n\n======== RENDERED AST ========');
logger.log(JSON.stringify(renderedAst, null, 2));
logger.log('\n\n======== RENDERED OUTPUT ========');
logger.log(renderedOutput);
logger.log('\n--------------');
