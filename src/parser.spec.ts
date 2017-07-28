
import * as test from 'tape';
import {isNode} from './b-tree';
import {parse} from './parser';

test('Parser', (t) => {
  const result = parse('cancer');
  t.ok(isNode(result), 'The result is a node');
  t.end();
});

// test('should parse simple query with special chars', (t) => {
//   t.plan(1);
//   const result = parse('qo/qa');
//   const term: Term = {text: 'qo/qa'};
//   t.deepEqual(result, term);
// });
// 
// test('should parse empty query', (t) => {
//   t.plan(1);
//   const result = parse('');
//   const term = {};
//   t.deepEqual(result, term);
// });
// 
// test('should parse implicit or bo', (t) => {
//   t.plan(3);
//   const result: any = parse('cancer or brain');
//   t.equal(result.value, 'OR');
//   t.equal(result.left.text, 'cancer');
//   t.equal(result.right.text, 'brain');
// });
// 
// test('should parse implicit bo', (t) => {
//   t.plan(3);
//   const result: any = parse('cancer brain');
//   t.equal(result.value, 'AND');
//   t.equal(result.left.text, 'cancer');
//   t.equal(result.right.text, 'brain');
// });
// 
// test('should parse explicit bo', (t) => {
//   t.plan(3);
//   const result: any = parse('cancer AND brain');
//   t.equal(result.value, 'AND');
//   t.equal(result.left.text, 'cancer');
//   t.equal(result.right.text, 'brain');
// });
// 
// test('should parse explicit bo', (t) => {
//   t.plan(4);
//   const result: any = parse('cancer NOT brain');
//   t.equal(result.value, 'AND');
//   t.equal(result.left.text, 'cancer');
//   t.equal(result.right.value, 'NOT');
//   t.equal(result.right.right.text, 'brain');
// });
// 
// test('should parse predicates', (t) => {
//   t.plan(4);
//   const result = <Filter> parse('tissue:brain');
//   t.assert(result.hasOwnProperty('predicate'));
//   t.equals(result.predicate, 'tissue');
//   t.assert(result.hasOwnProperty('text'));
//   t.equals(result.text, 'brain');
// });
// 
// test('should parser multiple quotes assay filters', t => {
//   t.plan(6);
//   const res = <BBTree> parse('assay:"Transcription Profiling by Array" OR assay:"Transcription Profiling by Array"');
//   t.assert(isBTree(res));
//   t.equals(res.value, 'OR');
//   t.assert(isFilter(res.left));
//   t.assert(isFilter(res.right));
//   t.equals(res.left['text'], 'Transcription Profiling by Array');
//   t.equals(res.right['text'], 'Transcription Profiling by Array');
// });
