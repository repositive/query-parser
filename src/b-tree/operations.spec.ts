import * as test from 'tape';
import { Test } from 'tape';
import { v4 as uuid } from 'uuid';
import { stub } from 'sinon';
import { Expression } from './expression';
import { Node } from './node';

import {fold, mapLeafs, filter, depth, weight} from './operations';

const n1 = {_id: uuid(), _type: 'test1'};
const n2 = {_id: uuid(), _type: 'test2'};
const exp = {
  _id: uuid(), _type: 'expression',
  value: 'AND', left: n1, right: n2
};

const n1Res = {_id: uuid(), _type: 'n1res'};
const n2Res = {_id: uuid(), _type: 'n2res'};

test('Operations fold', (t: Test) => {

  const result = {
    _id: uuid(),
    _type: 'result'
  };

  const acc = {_id: uuid(), _type: 'acc'};
  const cb = stub()
    .onCall(0).returns(n1Res)
    .onCall(1).returns(n2Res)
    .onCall(2).returns(result);
  const r = fold(exp, cb);

  t.deepEquals(r, result, 'Returns whatever the calback aggregates to');
  t.deepEquals(cb.getCall(0).args[0], n1, 'The first argument of the callback 1 is the node1');
  t.deepEquals(cb.getCall(0).args[1], undefined, 'When is a leaf do not attach left branch');
  t.deepEquals(cb.getCall(0).args[2], undefined, 'When is a leaf do not attach right branch');
  t.deepEquals(cb.getCall(1).args[0], n2, 'The first argument of the callback 2 is the node2');
  t.deepEquals(cb.getCall(2).args[0], exp, 'The first argument of the callback 3 is the expression node');
  t.deepEquals(cb.getCall(2).args[1], n1Res, 'Second argument on cb is the result of folding the left branch');
  t.deepEquals(cb.getCall(2).args[2], n2Res, 'Third argument on cb is the result of folding the right branch');

  t.end();
});

test('Operations mapLeafs', (t: Test) => {
  const cb = stub()
    .onCall(0).returns(n1Res)
    .onCall(1).returns(n2Res);

  const result = mapLeafs(exp, cb) as Expression<Node, Node>;

  t.notEquals(exp._id, result._id, 'The main node changes id');
  t.equals(exp._type, result._type, 'The type of the expression nodes is the same');
  t.deepEquals(result.left, n1Res, 'The result of the left branch was mapped');
  t.deepEquals(result.right, n2Res, 'THe result of the right branch was mapped');
  t.end();
});

test('Operations filter', (t: Test) => {
  const result = filter(exp, (n: Node) => n._type === n1._type);

  t.deepEquals(result, [n1], 'Returns an array with the matched nodes');
  t.end();
});

test('Operations weight', (t: Test) => {
  t.equals(weight(exp), 3, 'Measures weight of expressions');
  t.equals(weight(n1), 1, 'Measures weight of single nodes');
  t.end();
});

test('Operations depth', (t: Test) => {
  t.equals(depth(exp), 2, 'Measures depth of expressions');
  t.equals(depth(n1), 1, 'Measures depth of nodes');
  t.end();
});
