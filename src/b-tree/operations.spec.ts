import * as test from 'tape';
import { Test } from 'tape';
import { v4 as uuid } from 'uuid';
import { stub } from 'sinon';
import { AND, and, or, not, isExpression, isAND, isNOT, isOR} from './expression';
import { Node } from './node';
import { token, isToken } from './token';
import { predicate } from './predicate';

import {fold, mapLeafs, filter, depth, weight, remove, path, replace} from './operations';

const n1 = {_id: uuid(), _type: 'test1'};
const n2 = {_id: uuid(), _type: 'test2'};

const exp = and({left: n1, right: n2});

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

  const result = mapLeafs(exp, cb) as AND<Node, Node>;

  t.notEquals(exp._id, result._id, 'The main node changes id');
  t.equals(exp._type, result._type, 'The type of the expression nodes is the same');
  t.deepEquals(result.left, n1Res, 'The result of the left branch was mapped');
  t.deepEquals(result.right, n2Res, 'THe result of the right branch was mapped');
  t.end();
});

test('Operations filter', (t: Test) => {
  const expF = or({
    left: and({left: token('a'), right: token('b')}),
    right: not(predicate({value:'c', key: 'a', relation: '='}))
  });

  t.deepEquals(filter(expF, isAND), [expF.left], 'Filters AND');
  t.deepEquals(filter(expF, isNOT), [expF.right], 'Filters negations');
  t.deepEquals(filter(expF, isToken), [expF.left.left, expF.left.right], 'Filters tokens');
  t.deepEquals(filter(expF, (e) => e._type === 'predicate'), [expF.right.negated], 'Filters predicates');
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

test('Operations remove', (t: Test) => {
  t.deepEquals(remove(exp, exp.left), n2, 'If we remove the left branch we end up with the right branch');
  t.deepEquals(remove(exp, exp.right), n1, 'If we remove the right branch we end up just with the left one');
  t.deepEquals(remove(exp, ''), exp, 'If the Id does not exist do not remove anything and return the same node');
  t.deepEquals(remove(exp, exp.left._id), n2, 'You can also remove the nodes using the node id');

  const expR = and({right: not(token('right')), left: token('left')});
  t.deepEquals(remove(expR, expR.right), expR.left, 'Removes negation node');
  t.deepEquals(remove(expR, expR.right.negated), expR.left, 'Removes content of negation node');
  t.deepEquals(remove(expR, expR.left), expR.right, 'Removes non negation node and leave negation node intact');

  t.end();
});

test('Operations path', (t: Test) => {
  const expP = and({right: token('r'), left: token('l')});
  t.deepEquals(path(expP, expP.left), [expP.left, expP], 'Returns the path bottom up from the node');
  t.deepEquals(path(expP, expP.left._id), [expP.left, expP], 'Path also works with targets string');

  t.end();
});

test('Operations replace', (t: Test) => {
  const expR = and({right: token('r'), left: token('l')});
  const replacement = token('rep');

  t.deepEquals((replace({on: expR, target: expR.left, replacement}) as typeof expR).left, replacement, 'Returns the expected node replaced on expression');
  t.deepEquals(replace({on: expR, target: token('nope'), replacement}), expR, 'If there is nothing to replace return the same node on expression');

  const negR = not(token('negated'));

  t.deepEquals(replace({on: negR, target: token('nope'), replacement}), negR, 'If there is nothing to replace return the same node on negation');
  t.deepEquals((replace({on: negR, target: negR.negated, replacement}) as any).negated, replacement, 'Returns the expected node replaced on negation');
  t.end();
});
