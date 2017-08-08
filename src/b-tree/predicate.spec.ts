import {v4 as uuid} from 'uuid';
import * as test from 'tape';
import { Test } from 'tape';

import { predicate, isPredicate, ComparativeOperator } from './predicate';
import { token } from './token';

test('Predicate', (t: Test) => {
  ['==', '!', '=', '<', '>', '<=', '>='].forEach((k: ComparativeOperator) => {
    const filter = predicate({
      relation: k,
      key: 'a',
      value: 'b'
    });
    t.ok(isPredicate(filter), `Returns true on relation ${k}`);
  });

  t.end();
});
