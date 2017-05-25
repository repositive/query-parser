import * as test from 'tape';
import {map, isBTree, filter, mapLeafs} from '../../main/b-tree/index';
import {parseString} from '../../main/parsers/query-parser';
import {isTerm} from '../../main/b-exp-tree';

const tree = <any> parseString('cancer AND (brain OR breast)');
const tree2 = parseString('cancer AND (changed OR breast)');

test('filter', t => {
  t.plan(4);
  const result = <any> filter(tree, (t) => {
    if (isBTree(t)) {
      return isTerm(t.left) && t.left.text === 'brain';
    }
    else return false;
  });
  t.equals(result.length, 1);
  t.deepEquals(result[0].left, tree.right.left);
  t.deepEquals(result[0].right, tree.right.right);
  t.deepEquals(result[0].value, tree.right.value);
});

//TODO: Resolve test problems with ids
test.skip('map identity', t => {
  t.plan(2);
  t.deepEquals(tree, map(tree, t => t));
  const res = map(tree, (t, l, r) => {
    if (isTerm(t) && t.text === 'brain') {
      return {
        text: 'changed'
      };
    } else if(isBTree(t)) {
      return {
        value: t.value,
        right: r,
        left: l
      };
    } else {
      return t;
    }
  });
  t.deepEquals(tree2, res);
});

//TODO: Resolve test problems with ids
test.skip('mapLeaf', t => {
  t.plan(1);
  const res = mapLeafs(tree, l => {
    if (l.text === 'brain') return { text: 'changed' };
    else return l;
  });
  t.deepEquals(res, tree2);
});
