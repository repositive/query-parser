import {v4 as uuid} from 'uuid';
import * as test from 'tape';
import { Test } from 'tape';

import { predicate, isComparativeOperator, isPredicate } from './predicate';
import { token } from './token';

test('ComparativeOperator', (t: Test) => {
  ['==', '!', '=', '<', '>', '<=', '>='].forEach(k => {
    t.ok(isComparativeOperator(k), `${k} passes is valid`);
  });

  t.notOk(isComparativeOperator(''), 'If the string is not valid returns false');

  t.end();
});

test('Filter', (t: Test) => {
  const filter = predicate({
    relation: '=',
    key: 'test',
    value: 'cancer'
  });

  t.ok(isPredicate(filter), 'Returns true when dealing with a correct filter');

  t.end();
});
