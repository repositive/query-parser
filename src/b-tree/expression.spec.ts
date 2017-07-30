
import * as test from 'tape';
import {Test} from 'tape';
import {v4 as uuid} from 'uuid';
import { stub } from 'sinon';

import {
  isExpression, _expressionTypeCheck, _expressionValueCheck,
  _expressionLeftCheck, _expressionRightCheck,
  fold, map, mapLeafs
} from './expression';

test('Expression', (t: Test) => {

  t.ok(_expressionTypeCheck({_type: 'expression'}), 'Checks that type is "expression"');
  t.notOk(_expressionTypeCheck({}), 'If type does not exist returns false');
  t.notOk(_expressionTypeCheck({_type: 'another'}), 'If type if not "expression" typeCheck returns false');

  ['AND', 'OR'].forEach(value => {
    t.ok(_expressionValueCheck({value}), `${value} passes the valueCheck`);
  });

  t.notOk(_expressionValueCheck({}), 'The check for value returns false if the object does not have the property');
  t.notOk(_expressionValueCheck({value: 'NOT'}), 'The check for value returns false if the value is not an expression value');

  const node = {_id: uuid(), _type: ''};
  t.ok(_expressionLeftCheck({left: node}), 'The check for left ensures that there is a node there');
  t.notOk(_expressionLeftCheck({}), 'The left check fails if there is no left branch');
  t.ok(_expressionRightCheck({right: node}), 'The check for right ensures that there is a node there');
  t.notOk(_expressionRightCheck({}), 'The right check fails if there is no right branch');

  t.ok(isExpression({_id: uuid(), _type: 'expression', value: 'AND', left: node, right: node}), 'isExpression returns true on Expression');

  t.end();
});

test('Expression fold', (t: Test) => {
  const n1 = {_id: uuid(), _type: 'test1'};
  const n2 = {_id: uuid(), _type: 'test2'};
  const exp = {
    _id: uuid(), _type: 'expression',
    value: 'AND', left: n1, right: n2
  };

  const result = {
    _id: uuid(),
    _type: 'result'
  };

  const acc = {_id: uuid(), _type: 'acc'};
  const cb = stub()
    .withArgs(n1).returns(undefined)
    .withArgs(n2).returns(undefined)
    .withArgs(exp).returns(result);
  const r = fold(exp, cb, acc);

  t.deepEquals(r, result, 'Returns whatever the calback aggregates to');
  t.deepEquals(cb.getCall(0).args[0], n1, 'The first argument of the callback 1 is the node1');
  t.deepEquals(cb.getCall(1).args[0], n2, 'The first argument of the callback 2 is the node2');
  t.deepEquals(cb.getCall(2).args[0], exp, 'The first argument of the callback 3 is the expression node');
  t.end();
});
