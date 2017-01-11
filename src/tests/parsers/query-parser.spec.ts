
import * as test from 'tape';
import {Token} from '../../main/parsers/base-parser';
import {Filter, Term, BBTree, isFilter} from '../../main/b-exp-tree';
import {tokenStripper, tokenizer, parseString as parse} from '../../main/parsers/query-parser';
import extractQuoted from '../../main/parsers/extract-quoted';
import extractParenthesys from '../../main/parsers/extract-parenthesys';
import extractLooseWords from '../../main/parsers/extract-loose-words';
import extractPredicates from '../../main/parsers/extract-predicates';
import extractNOT from '../../main/parsers/extract-NOT';
import extractBoolean from '../../main/parsers/extract-explicit-boolean';
import extractIBoolean from '../../main/parsers/extract-implicit-boolean';
import {isBTree} from "../../main/b-tree/index";

test('should parse a simple query', (t) => {
  t.plan(1);
  const result = parse('cancer');
  const term: Term = {text: 'cancer'};
  t.deepEqual(result, term);
});

test('should parse simple query with special chars', (t) => {
  t.plan(1);
  const result = parse('qo/qa');
  const term: Term = {text: 'qo/qa'};
  t.deepEqual(result, term);
});

test('should parse empty query', (t) => {
  t.plan(1);
  const result = parse('');
  const term = {};
  t.deepEqual(result, term);
});

test('should parse implicit bo', (t) => {
  t.plan(3);
  const result: any = parse('cancer brain');
  t.equal(result.value, 'AND');
  t.equal(result.left.text, 'cancer');
  t.equal(result.right.text, 'brain');
});

test('should parse explicit bo', (t) => {
  t.plan(3);
  const result: any = parse('cancer AND brain');
  t.equal(result.value, 'AND');
  t.equal(result.left.text, 'cancer');
  t.equal(result.right.text, 'brain');
});

test('should parse explicit bo', (t) => {
  t.plan(4);
  const result: any = parse('cancer NOT brain');
  t.equal(result.value, 'AND');
  t.equal(result.left.text, 'cancer');
  t.equal(result.right.value, 'NOT');
  t.equal(result.right.right.text, 'brain');
});

test('should parse predicates', (t) => {
  t.plan(4);
  const result = <Filter> parse('tissue:brain');
  t.assert(result.hasOwnProperty('predicate'));
  t.equals(result.predicate, 'tissue');
  t.assert(result.hasOwnProperty('text'));
  t.equals(result.text, 'brain');
});

test('should parser multiple quotes assay filters', t => {
  t.plan(6);
  const res = <BBTree> parse('assay:"Transcription Profiling by Array" OR assay:"Transcription Profiling by Array"');
  t.assert(isBTree(res));
  t.equals(res.value, 'OR');
  t.assert(isFilter(res.left));
  t.assert(isFilter(res.right));
  t.equals(res.left['text'], 'Transcription Profiling by Array');
  t.equals(res.right['text'], 'Transcription Profiling by Array');
});

test('parenthesys does not extract other stuff', t => {
  t.plan(1);
  const result = extractParenthesys('this is not "extracted"');
  t.deepEqual([], result);
});

test('parenthesys concat results to acc', t => {
  t.plan(1);
  const output: Token = {type: 'term', from: 0, to: 4, term: 'test'};
  const result = extractParenthesys('no match here', [output]);
  t.deepEqual(result, [output]);
});

test('extract simple parenthesys', t => {
  t.plan(2);
  const result = extractParenthesys('(1)');
  t.deepEqual(result, [{type: 'group', from: 0, to: 3, term: '1'}]);
  t.equal('(1)'.substring(result[0].from, result[0].to), '(1)');
});

test('extract only group', t => {
  t.plan(1);
  const result =  extractParenthesys('one two (group here)');
  t.deepEqual(result, [{type: 'group', from: 8, to: 20, term: 'group here'}]);
});

test('extract multiple groups', t => {
  t.plan(1);
  const result = extractParenthesys('(one) (two)');
  t.deepEqual(result, [
    {type: 'group', from: 0, to: 5, term: 'one'},
    {type: 'group', from: 6, to: 11, term: 'two'}
  ]);
});

test('extract super-group of embedded', t => {
  t.plan(1);
  const result = extractParenthesys('(one OR (two AND three))');
  t.deepEqual(result, [
    {type: 'group', from: 0, to: 24, term: 'one OR (two AND three)'}
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
});

test('extract multiple quoted entries from string', t => {
  t.plan(3);
  const str = '"1" n "2"';
  const result = extractQuoted(str);

  t.deepEqual(
    [
      {type: 'term', from: 0, to: 3, term: '1'},
      {type: 'term', from: 6, to: 9, term: '2'}
    ],
    result
  );

  t.deepEqual('"1"', str.substring(result[0].from, result[0].to));
  t.deepEqual('"2"', str.substring(result[1].from, result[1].to));
});

test('extract single quoted with spaces', t => {
  t.plan(2);
  const str = '"hello world"';
  const result = extractQuoted(str);

  t.deepEquals(
    [
      {type: 'term', from: 0, to: 13, term: 'hello world'}
    ],
    result
  );

  t.deepEquals(str, str.substring(result[0].from, result[0].to));
});

test('parse loose words of empty', t => {
  t.plan(1);
  const result = extractLooseWords('');
  t.deepEquals(result, []);
});

test('parse loose words concats the accumulated tokens', t => {
  t.plan(1);
  const acc = <Token[]> [{type: 'term', from: 0, to: 4, term: 'test'}];
  const result = extractLooseWords('', acc);
  t.deepEquals(result, acc);
});

test('parse loose words simple', t => {
  t.plan(1);
  const result =  extractLooseWords('test');
  t.deepEquals(result, [{type: 'term', from: 0, to: 4, term: 'test'}]);
});

test('parse loose words multiple', t => {
  t.plan(1);
  const result =  extractLooseWords('hello world');
  t.deepEquals(result, [
    {type: 'term', from: 0, to: 5, term: 'hello'},
    {type: 'term', from: 6, to: 11, term: 'world'}
  ]);
});

test('parse simple predicates', function (t) {
  t.plan(1);
  const result = extractPredicates('hello:world');
  t.deepEquals(result, [
    {type: 'filter', from: 0, to: 11, term: 'world', predicate: 'hello'}
  ]);
});

test('parse predicates from longer string', function (t) {
  t.plan(2);
  let result = extractPredicates('assay:RNA-Seq cancer');
  t.deepEquals(result, [
    {type: 'filter', from: 0, to: 13, term: 'RNA-Seq', predicate: 'assay'}
  ]);
  result = extractPredicates('cancer AND assay:RNA-Seq AND ');
  t.deepEquals(result, [
    {type: 'filter', from: 11, to: 24, term: 'RNA-Seq', predicate: 'assay'}
  ]);
});

test('parse multiple predicates', function (t) {
  t.plan(2);
  const result = extractPredicates('glioblastoma assay:RNA-Seq assay:RNA-seq');
  t.deepEquals(result, [
    {type: 'filter', from: 13, to: 26, term: 'RNA-Seq', predicate: 'assay'},
    {type: 'filter', from: 27, to: 40, term: 'RNA-seq', predicate: 'assay'}
  ]);
  const multiple = extractPredicates('assay:"Transcription Profiling by Array" OR assay:"Transcription Profiling by Array"');
  t.deepEquals(multiple, [
    {type: 'filter', from: 0, to: 40, term: 'Transcription Profiling by Array', predicate: 'assay'},
    {type: 'filter', from: 44, to: 84, term: 'Transcription Profiling by Array', predicate: 'assay'}
  ]);
});

test('parse with spaces around colon', function (t) {
  t.plan(1);
  const result = extractPredicates('glioblastoma assay : RNA-Seq assay:RNA-seq');
  t.deepEquals(
    result,
    [
      {type: 'filter', from: 13, to: 28, term: 'RNA-Seq', predicate: 'assay'},
      {type: 'filter', from: 29, to: 42, term: 'RNA-seq', predicate: 'assay'}
    ]
  );
});

test('predicate parsing should support quoted terms', function (t) {
  t.plan(2);
  let result = extractPredicates('assay:"Whole Genome Sequencing"');
  t.deepEquals(result, [
    {type: 'filter', from: 0, to: 31, term: 'Whole Genome Sequencing', predicate: 'assay'}
  ]);
  result = extractPredicates('glioblastoma assay : RNA-Seq assay:RNA-seq assay : "Whole Genome Sequencing" "test quotes" AND');
  t.deepEquals(
    result,
    [
      {type: 'filter', from: 13, to: 28, term: 'RNA-Seq', predicate: 'assay'},
      {type: 'filter', from: 29, to: 42, term: 'RNA-seq', predicate: 'assay'},
      {type: 'filter', from: 43, to: 76, term: 'Whole Genome Sequencing', predicate: 'assay'}
    ]
  );
});


test('predicate parsing should be robust to empty strings', function (t) {
  t.plan(1);
  const result = extractPredicates('');
  t.deepEquals(result, []);
});

test('predicate parsing should be robust to regular tokens', function (t) {
  t.plan(1);
  const result = extractPredicates('cancer');
  t.deepEquals(result, []);
});

test('predicate parsing should be robust to stray colons', function (t) {
  t.plan(3);
  let result = extractPredicates('cancer:');
  t.deepEquals(result, []);
  result = extractPredicates('cancer :');
  t.deepEquals(result, []);
  result = extractPredicates('cancer : ');
  t.deepEquals(result, []);
});

test('predicate parser should add results to accumulator', function (t) {
  t.plan(1);
  const result = extractPredicates('cancer', [
    {type: 'filter', from: 13, to: 28, term: 'RNA-Seq', predicate: 'assay'},
    {type: 'filter', from: 29, to: 42, term: 'RNA-seq', predicate: 'assay'},
    {type: 'filter', from: 43, to: 76, term: 'Whole Genome Sequencing', predicate: 'assay'}
  ]);
  t.deepEquals(result, [
    {type: 'filter', from: 13, to: 28, term: 'RNA-Seq', predicate: 'assay'},
    {type: 'filter', from: 29, to: 42, term: 'RNA-seq', predicate: 'assay'},
    {type: 'filter', from: 43, to: 76, term: 'Whole Genome Sequencing', predicate: 'assay'}
  ]);
});

test('tokenStripper - basic usage', t => {
  t.plan(1);
  const str = 'test';
  const tokens = <Token[]>[{type: 'term', from: 0, to: 4, term: 'test'}];
  const result = tokenStripper(str, tokens);
  t.deepEqual(result, []);
});

test('tokenStripper - multiple tokens', t => {
  t.plan(1);
  const str = '"quoted here" AND (group)';
  const tokens = <Token[]> [
    {type: 'term', from: 0, to: 13, term: 'quoted here'},
    {type: 'group', from: 18, to: 25, term: 'group'}
  ];
  const result = tokenStripper(str, tokens);
  t.deepEqual(result, [{ from: 13, to: 18, term: ' AND '}]);
});

test('tokenStripper - multiple tokens and nothing left', t => {
  t.plan(1);
  const str = 'one two';
  const tokens = <Token[]> [
    {type: 'term', from: 0, to: 3, term: 'one'},
    {type: 'bo', from: 3, to: 4, term: 'AND'},
    {type: 'term', from: 4, to: 7, term: 'two'}
  ];
  const result = tokenStripper(str, tokens);
  t.deepEqual(result, []);
});

test('tokenStripper - multiple tokens and stuff left', t => {
  t.plan(1);
  const str = 'one two tree four';
  const tokens = <Token[]> [
    {type: 'term', from: 0, to: 3, term: 'one'},
    {type: 'term', from: 4, to: 7, term: 'two'},
    {type: 'term', from: 8, to: 12, term: 'three'}
  ];
  const result = tokenStripper(str, tokens);
  t.deepEqual(result, [{ from: 3, to: 4, term: ' '}, {from: 7, to: 8, term: ' '}, {from: 12, to: 17, term: ' four'}]);
});

test('tokenStripper - strip with nothing', t => {
  t.plan(1);
  const str = 'one';
  const tokens = [];
  const result = tokenStripper(str, tokens);
  t.deepEqual(result, [{from: 0, to: 3, term: 'one'}]);
});

test('extract starting NOT', t => {
  t.plan(1);
  const input = 'NOT glaucoma';
  const result = [{ type: 'not', from: 0, to: 4, term: 'NOT'}];
  t.deepEqual(extractNOT(input), result);
});

test('extract NOT from implicit AND NOT', t => {
  t.plan(1);
  const input = 'a NOT glaucoma';
  const result = [{ type: 'not', from: 2, to: 6, term: 'NOT'}];
  t.deepEqual(extractNOT(input), result);
});

test('extract NOT from explicit AND NOT', t => {
  t.plan(1);
  const input = 'a AND NOT something';
  const result = [{ type: 'not', from: 6, to: 10, term: 'NOT' }];
  t.deepEqual(extractNOT(input), result);
});

test('boolean parser', t => {
  t.plan(1);
  const input = 'glaucoma AND ';
  const result = [{ type: 'bo', from: 8, to: 13, term: 'AND'}];
  t.deepEqual(extractBoolean(input), result);
});

test('boolean parser OR', t => {
  t.plan(1);
  const input = 'one OR another';
  const result = [{ type: 'bo', from: 3, to: 7, term: 'OR'}];
  t.deepEqual(extractBoolean(input), result);
});

test('boolean parser multiple', t => {
  t.plan(1);
  const input = 'one AND another OR these';
  const result = [{ type: 'bo', from: 3, to: 8, term: 'AND'}, {type: 'bo', from: 15, to: 19, term: 'OR' }];
  t.deepEqual(extractBoolean(input), result);
});

test('boolean parser implicit simple', t => {
  t.plan(1);
  const input = ' ';
  const result = [{type: 'bo', from: 0, to: 1, term: 'AND'}];
  t.deepEqual(extractIBoolean(input), result);
});

test('boolean parser implicit multiple spaces', t => {
  t.plan(1);
  const input = '   ';
  const result = [{type: 'bo', from: 0, to: 1, term: 'AND'}];
  t.deepEqual(extractIBoolean(input), result);
});

test('boolean parser implicit sandwitch', t => {
  t.plan(1);
  const input = 'a b';
  const result = [{type: 'bo', from: 1, to: 2, term: 'AND'}];
  t.deepEqual(extractIBoolean(input), result);
});

test('boolean parser implicit double', t => {
  t.plan(1);
  const input = ' a ';
  const result = [{type: 'bo', from: 0, to: 1, term: 'AND'}, {type: 'bo', from: 2, to: 3, term: 'AND'}];
  t.deepEqual(extractIBoolean(input), result);
});

test('tokenizer - extract tokens from simple strng', t => {
  t.plan(1);
  const str = 'test';
  const tokens = [{type: 'term', from: 0, to: 4, term: 'test'}];
  const result = tokenizer(str);
  t.deepEqual(result, tokens);
});

test('tokenizer - extract tokens from group string', t => {
  t.plan(1);
  const str = '(one OR two)';
  const tokens = [
    {type: 'group', from: 0, to: 12, term: 'one OR two'}
  ];
  const result = tokenizer(str);
  t.deepEqual(result, tokens);
});

test('tokenizer - extract tokens from simple explicit boolean', t => {
  t.plan(1);
  const str = 'one AND two';
  const tokens = [
    {type: 'term', from: 0, to: 3, term: 'one'},
    {type: 'bo', from: 3, to: 8, term: 'AND'},
    {type: 'term', from: 8, to: 11, term: 'two'}
  ];
  const result = tokenizer(str);
  t.deepEqual(result, tokens);
});

test('tokenizer - extract tokens from simple implicit boolean', t => {
  t.plan(1);
  const str = 'one two';
  const tokens = [
    {type: 'term', from: 0, to: 3, term: 'one'},
    {type: 'bo', from: 3, to: 4, term: 'AND'},
    {type: 'term', from: 4, to: 7, term: 'two'}
  ];
  const result = tokenizer(str);
  t.deepEqual(result, tokens);
});

test('tokenizer - extract tokens from all parsers', t => {
  t.plan(1);
  const str = 'one "two" NOT (group)';
  const tokens = [
    {type: 'term', from: 0, to: 3, term: 'one'},
    {type: 'bo', from: 3, to: 4, term: 'AND'},
    {type: 'term', from: 4, to: 9, term: 'two'},
    {type: 'bo', from: 9, to: 10, term: 'AND'},
    {type: 'not', from: 10, to: 14, term: 'NOT'},
    {type: 'group', from: 14, to: 21, term: 'group'}
  ];
  const result = tokenizer(str);
  t.deepEqual(result, tokens);
});
