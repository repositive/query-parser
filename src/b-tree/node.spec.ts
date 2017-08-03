import * as test from 'tape';
import {Test} from 'tape';
import {v4 as uuid} from 'uuid';

import {isNode} from './node';

test('Node', (t: Test) => {

  t.ok(isNode({_id: uuid(), _type: ''}), 'If its a node isNode returns true');

  t.notOk(isNode({}), 'If its not a node isNode returns false');
  t.notOk(isNode(undefined), 'If its null isNode returns false');

  t.end();
});
