import * as test from 'tape';
import { Test } from 'tape';
import { toElastic2 } from './elastic2';
import { fromNatural } from '../parsers';
import { pipe } from 'ramda';

const toES = pipe(fromNatural, toElastic2);

test('Elastic serializer', (t: Test) => {
  t.deepEquals(toES(''), {query: {match_all: {}}}, 'Serializes empty node as match_all');
  t.deepEquals(toES('cancer'), {query: {match: {_all: 'cancer'}}}, 'Token serializes as match all');
  t.deepEquals(toES('"a space"'), {query: {match_phrase: {_all: 'a space'}}}, 'Quoted returns a match_phrase using spaces');
  t.deepEquals(toES('a:b'), {query: {match: {a: 'b'}}}, 'Predicate returns a match on the specified predicate');
  t.deepEquals(toES('a:"b c"'), {query: {match_phrase: {a: 'b c'}}}, 'Quoted on predicate matches by phrase using spaces');
  t.deepEquals(toES('a:<b'), {query: {range: {a: {lt: 'b'}}}}, 'Comparison lt creates a range');
  t.deepEquals(toES('a:>b'), {query: {range: {a: {gt: 'b'}}}}, 'Comparison gt creates a range');
  t.deepEquals(toES('a:<=b'), {query: {range: {a: {lte: 'b'}}}}, 'Comparison lte creates a range');
  t.deepEquals(toES('a:>=b'), {query: {range: {a: {gte: 'b'}}}}, 'Comparison gte creates a range');
  t.deepEquals(toES('a:!b'), {query: {bool: {'must_not': {match: {a: 'b'}}}}}, 'Negation on predicate serializes to a boolean must_not');
  t.deepEquals(toES('a:!"b c"'), {query: {bool: {'must_not': {match_phrase: {a: 'b c'}}}}}, 'Negation also works with quoted spaced match_phrases');
  t.deepEquals(toES('a:==b'), {query: {term: {a: 'b'}}}, 'Serializes exact match as term match');
  t.deepEquals(toES('not this'), {query: {bool: {'must_not': {match: {_all: 'this'}}}}}, 'Negation serializes to must_not of internals');
  t.deepEquals(toES('one test'), {query: {bool: {must: [{match: {_all: 'one'}}, {match: {_all: 'test'}}]}}}, 'AND Expression serializes to must of internals');
  t.deepEquals(toES('one or test'), {query: {bool: {should: [{match: {_all: 'one'}}, {match: {_all: 'test'}}]}}}, 'OR Expression serializes to should of internals');

  t.deepEquals(toES('one*'), {query: {prefix: {_all: 'one'}}}, 'Wildcard on token is serialized with prefix');
  t.deepEquals(toES('*'), {query: {match: {_all: '*'}}}, 'Total wildcard is matches exact word');

  t.deepEqual(toES('pred:*'), {query: {exists: {field: 'pred'}}}, 'Direct wildcard on predicate checks if the property exists in the document');
  t.deepEqual(toES('pred:one*'), {query: {prefix: {pred: 'one'}}}, 'Wildcard on predicate checks the prefix of the pred');
  t.end();
});

