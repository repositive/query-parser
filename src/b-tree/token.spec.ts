
import * as test from 'tape';
import {Test} from 'tape';
import {v4 as uuid} from 'uuid';
import { stub } from 'sinon';

import { Token, isToken } from './token';

test('Token', (t: Test) => {
  const tok = {_id: uuid(), fuzzy: true, _type: 'token', value: 'cancer'};


  t.ok(isToken(tok), 'Returns true if is a valid token obj');
  t.notOk(isToken({}), 'Returns false if there is no valid token obj');
  t.notOk(isToken(undefined), 'Returns false if there is no input');

  t.end();
});
