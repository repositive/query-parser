import * as test from 'tape';
import {and, BTree, SearchNode} from '../main/b-tree';

test('and - yould apend one tree to another', t => {
  t.plan(1);
  const tree1 = <BTree<SearchNode>> {value: { operator: 'AND', left: { value: {text: 'left'}, right: {value: {text: 'right'}}} }};
  const tree2 = <BTree<SearchNode>> {value: { text: 'test'}};
  const result = and(tree1, tree2);
  t.deepEqual(result, {
    value: {operator: 'AND'},
    left: {value: {operator: 'AND', left: {value: { text: 'left'}, right: {value: {text: 'right'}}}}},
    right: {value: {text: 'test'}}
  });
});
