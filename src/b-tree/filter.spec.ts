import {v4 as uuid} from 'uuid';
import * as test from 'tape';
import { Test } from 'tape';

import { isComparativeOperator, isFilter } from './filter';

test('ComparativeOperator', (t: Test) => {
  ['EXACT', 'NE', 'EQ', 'LT', 'GT', 'LTE', 'GTE'].forEach(k => {
    t.ok(isComparativeOperator(k), `${k} passes is valid`);
  });

  t.notOk(isComparativeOperator(''), 'If the string is not valid returns false');

  t.end();
});

test('Filter', (t: Test) => {
  const filter = {
    _id: uuid(),
    _type: 'filter',
    relation: 'EQ',
    predicate: 'test',
    value: {
      _id: uuid(),
      _type: 'token',
      value: 'value'
    }
  };

  t.ok(isFilter(filter), 'Returns true when dealing with a correct filter');

  t.end();
});
