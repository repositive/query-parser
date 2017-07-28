import * as test from 'tape';
import {Test} from 'tape';
import {v4 as uuid} from 'uuid';

import {isObj, _nodeIdCheck, _nodeTypeCheck, isNode} from './node';

test('isNode', (t: Test) => {

  t.ok(isObj({}), 'isObj detect objects');
  t.ok(isObj({key: 'v'}), 'isObj detect non empty objects');
  t.notOk(isObj(null), 'isObj does not match null');

  t.ok(_nodeIdCheck({_id: uuid()}), '_idCheck checks that _id of an object is string');
  t.notOk(_nodeIdCheck({}), '_idCheck fails if the object does not have the property');
  t.notOk(_nodeIdCheck({_id: 1}), 'if _id is not a string the check fails');

  t.ok(_nodeTypeCheck({_type: ''}), '_nodeTypeCheck ensures that _type is a string');
  t.notOk(_nodeTypeCheck({}), '_nodeTypeCheck fails if the object does not have _type');
  t.notOk(_nodeTypeCheck({_type: 1}), '_nodeTypeCheck fails if _type is not a string');

  t.ok(isNode({_id: uuid(), _type: ''}), 'If its a node isNode returns true');

  t.notOk(isNode({}), 'If its not a node isNode returns false');
  t.notOk(isNode(null), 'If its null isNode returns false');

  t.end();
});
