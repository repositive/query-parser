
import * as test from 'tape';
import {parseString as parse} from '../../main/parsers/query-parser';
import extractQuoted from '../../main/parsers/extract-quoted';

test('should parse a simple query',(t) => {
  t.plan(1);
  const result = parse('cancer');
  t.deepEqual(result, {value: { text: 'cancer'}});
});

test('extract quoted of simple string', t => {
  t.plan(1);
  const result = extractQuoted('"test"');
  t.deepEqual(result, [{type: 'term', position: 0, term: 'test'}]);
});

test('extract multiple quoted entries from string', t => {
  t.plan(1);
  const result = extractQuoted('"1" n "2"');

  t.deepEqual(result, [
    {type: 'term', position: 0, term: '1'},
    {type: 'term', position: 6, term: '2'}
  ]);
});

test('extract single quoted with spaces', t => {
  t.plan(1);
  const result = extractQuoted('"hello world"');

  t.deepEquals(result, [
    {type: 'term', position: 0, term: 'hello world'}
  ]);
});

test.skip('should parse a simple query with multiple values', (t) => {
  t.plan(2);
  const result1 = parse('simple query');
  t.deepEqual(result1, {$and: [{text: 'simple'}, {text: 'query'}]});

  const result2 = parse('another simple query');
  t.deepEqual(result2, {$and: [{text: 'another'}, {text: 'simple'}, {text: 'query'}]});
});


test.skip('should parse a match exactly simple query', (t) => {
  t.plan(1);
  const result = parse('"simple query"')
  t.deepEqual(result, {$and: [{text: 'simple query'}]});
});

test.skip('should parse a match exactly multiple times', (t) => {
  t.plan(1);
  const result = parse('"first match" "second match"');
  t.deepEqual(result, {$and: [{text: 'first match'}, {text: 'second match'}]});
});

test.skip('should parse a exact match with loose interpolated', (t) => {
  t.plan(1);
  const result = parse('"first match" second match "third match"');
  t.deepEqual(result, {$and: [
    {text: 'first match'},
    {text: 'third match'},
    {text: 'second'},
    {text: 'match'}
  ]});
});
