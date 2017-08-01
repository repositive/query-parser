import * as test from 'tape';
import {Test} from 'tape';
import {v4 as uuid} from 'uuid';
import { stub } from 'sinon';

import { Negation, isNegation, negation } from './negation';
import { token } from './token';

test('Negation', (t: Test) => {

  t.ok(isNegation(negation(token('cancer'))), 'Returns true if its a valid negation');

  t.end();
});
