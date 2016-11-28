/**
 * Created by dennis on 28/11/2016.
 */

import * as test from 'tape';
import * as queryalizer from '../main/index';

const input1 = {
  $and: [
    {text: 'cancer'},
    {assay: 'X'},
    {$or: [
      {collection: 'Y'},
      {collection: 'Z'}
    ]}
  ]
};

test('serialize', function (t) {
  t.plan(1);

  const result = queryalizer(input1);
  t.equal(typeof result, 'string');
});