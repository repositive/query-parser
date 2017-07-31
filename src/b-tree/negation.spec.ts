import * as test from 'tape';
import {Test} from 'tape';
import {v4 as uuid} from 'uuid';
import { stub } from 'sinon';

import { Negation, isNegation } from './negation';

test('Negation', (t: Test) => {
  const tok = {_id: uuid(), _type: 'negation', value: {_type: '', _id: uuid()}};

  t.ok(isNegation(tok), 'Returns true if its a valid negation');

  t.end();
});
