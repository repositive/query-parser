import * as test from 'tape';
import { Test } from 'tape';
import { toNatural } from './natural';
import { fromNatural } from '../parsers';
import { fold } from '../b-tree/operations';
import { pipe } from 'ramda';

test('String serializer', (t: Test) => {
  function removeNatural(tree) {
    return fold(tree, (n, l, r) => {
      const acc = {...n, right: r, left: l};
      delete acc._original;
      return acc;
    });
  }

  const seriParse = pipe(fromNatural, removeNatural, toNatural);
  const eqParse = (str: string, msg: string) => t.equals(seriParse(str), str, msg);
  eqParse('', 'Serializes non existing node');
  eqParse('cancer', 'Serializes token');
  eqParse('"lung cancer"', 'Serializes quoted token');
  eqParse('lung cancer', 'Serializes implicit expression');
  eqParse('lung OR cancer', 'Serializes explicit expression');
  eqParse('lung (one OR other)', 'Serializes nested expressions');
  eqParse('lung NOT cancer', 'Serialize negation');
  eqParse('lung NOT (cancer OR another)', 'Serialize nested negation');
  eqParse('key:value', 'Serializes predicates');
  eqParse('k1:v1 k2:v2', 'Serializes expresive predicates');
  eqParse('k1:!v1', 'Serializes ne predicate');
  eqParse('k1:==v1', 'Serializes exact predicate');
  eqParse('k1:>=v1', 'Serializes gte predicate');
  eqParse('k1:<=v1', 'Serializes lte predicate');
  eqParse('k1:>v1', 'Serializes gt predicate');
  eqParse('k1:<v1', 'Serializes lt predicate');
  eqParse('k1:"one more"', 'Serializes quoted strings in predicates');

  const seriParse2 = pipe(fromNatural, toNatural);
  const eqParse2 = (str: string, msg: string) => t.equals(seriParse2(str), str, msg);

  eqParse2('', 'Serializes non existing node');
  eqParse2('cancer', 'Serializes token');
  eqParse2('"lung   cancer"', 'Serializes quoted token');
  eqParse2('lung   cancer', 'Serializes implicit expression');
  eqParse2('lung or cancer', 'Serializes explicit expression');
  eqParse2('lung and (one or other)', 'Serializes nested expressions');
  eqParse2('lung not cancer', 'Serialize negation');
  eqParse2('lung and not (cancer or another)', 'Serialize nested negation');
  eqParse2('key:  value', 'Serializes predicates');
  eqParse2('k1: = v1 k2: v2', 'Serializes expresive predicates');
  eqParse2('k1: !v1', 'Serializes ne predicate');
  eqParse2('k1: == v1', 'Serializes exact predicate');
  eqParse2('k1:>= v1', 'Serializes gte predicate');
  eqParse2('k1: <=v1', 'Serializes lte predicate');
  eqParse2('k1:> v1', 'Serializes gt predicate');
  eqParse2('k1: <v1', 'Serializes lt predicate');
  eqParse2('k1:"one   more"', 'Serializes quoted strings in predicates');

  t.end();
});
