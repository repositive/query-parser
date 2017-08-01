import * as test from 'tape';
import { Test } from 'tape';
import { toBoolString } from './string-serializer';
import { parse } from '../parser';
import { pipe } from 'ramda';

test('String serializer', (t: Test) => {
  const seriParse = pipe(parse, toBoolString);
  const eqParse = (str: string, msg: string) => t.equals(seriParse(str), str, msg);
  eqParse('cancer', 'Serializes token');
  eqParse('lung cancer', 'Serializes implicit expression');
  eqParse('lung OR cancer', 'Serializes explicit expression');
  eqParse('lung (one OR other)', 'Serializes nested expressions');
  eqParse('key:value', 'Serializes predicates');
  eqParse('k1:v1 k2:v2', 'Serializes expresive predicates');
  eqParse('k1:!v1', 'Serializes ne predicate');
  eqParse('k1:==v1', 'Serializes exact predicate');
  eqParse('k1:>=v1', 'Serializes gte predicate');
  eqParse('k1:<=v1', 'Serializes lte predicate');
  eqParse('k1:>v1', 'Serializes gt predicate');
  eqParse('k1:<v1', 'Serializes lt predicate');

  t.end();
});
