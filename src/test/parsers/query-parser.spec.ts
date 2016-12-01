
import * as test from 'tape';
import {Token} from '../../main/parsers/base-parser';
import {parseString as parse} from '../../main/parsers/query-parser';
import extractQuoted from '../../main/parsers/extract-quoted';
import extractParenthesys from '../../main/parsers/extract-parenthesys';

test('should parse a simple query',(t) => {
  t.plan(1);
  const result = parse('cancer');
  t.deepEqual({value: { text: 'cancer'}}, result);
});

test('parenthesys does not extract other stuff', t => {
  t.plan(1);
  const result = extractParenthesys('this is not "extracted"');
  t.deepEqual([], result);
})

test('parenthesys concat results to acc', t => {
  t.plan(1);
  const output: Token = {type: 'term', from: 0, to: 4, term: 'test'};
  const result = extractParenthesys('no match here', [output]);
  t.deepEqual(result, [output]);
})

test('extract simple parenthesys', t => {
  t.plan(1);
  const result = extractParenthesys('(1)');
  t.deepEqual(result, [{type: 'group', from: 0, to: 2, term: '1'}]);
});

test('extract only group', t => {
  t.plan(1);
  const result =  extractParenthesys('one two (group here)');
  t.deepEqual(result, [{type: 'group', from: 8, to: 19, term: 'group here'}]);
});

test('extract multiple groups', t => {
  t.plan(1);
  const result = extractParenthesys('(one) (two)');
  t.deepEqual(result, [
    {type: 'group', from: 0, to: 4, term: 'one'},
    {type: 'group', from: 6, to: 10, term: 'two'}
  ]);
})

test('extract super-group of embedded', t => {
  t.plan(1);
  const result = extractParenthesys('(one OR (two AND three))');
  t.deepEqual(result, [
    {type: 'group', from: 0, to: 23, term: 'one OR (two AND three)'}
  ]);
});

test('quotes does not extract other stuff', t => {
  t.plan(1);
  const result = extractQuoted('this is (not extracted)');
  t.deepEqual([], result);
});

test('extract quoted of simple string', t => {
  t.plan(1);
  const result = extractQuoted('"test"');
  t.deepEqual([{type: 'term', from: 0, to: 6, term: 'test'}], result);
});

test('concat to previous extracted items', t => {
  t.plan(1);
  const result = extractQuoted('not match', [{type: 'term', from: 0, to: 6, term: 'test'}]);
  t.deepEqual([{type: 'term', from: 0, to: 6, term: 'test'}], result);
})

test('extract multiple quoted entries from string', t => {
  t.plan(3);
  const str = '"1" n "2"';
  const result = extractQuoted(str);

  t.deepEqual([
    {type: 'term', from: 0, to: 3, term: '1'},
    {type: 'term', from: 6, to: 9, term: '2'}
  ], result);

  t.deepEqual('"1"', str.substring(result[0].from, result[0].to));
  t.deepEqual('"2"', str.substring(result[1].from, result[1].to));
});

test('extract single quoted with spaces', t => {
  t.plan(2);
  const str = '"hello world"'
  const result = extractQuoted(str);

  t.deepEquals([
    {type: 'term', from: 0, to: 13, term: 'hello world'}
  ], result);

  t.deepEquals(str, str.substring(result[0].from, result[0].to));
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
