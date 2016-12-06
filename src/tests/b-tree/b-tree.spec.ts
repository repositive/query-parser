import * as test from 'tape';
import {map, isBTree, mapLeafs} from "../../main/b-tree/index";
import {parseString} from "../../main/parsers/query-parser";
import {isTerm} from "../../main/b-exp-tree";

const tree = parseString('cancer AND (brain OR breast)');
const tree2 = parseString('cancer AND (changed OR breast)');

test('map identity', t => {
  t.plan(2);
  t.deepEquals(tree, map(tree, t => t));
  const res = map(tree, (t, l, r) => {
    if (isTerm(t) && t.text === 'brain') {
      return {
        text: 'changed'
      }
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

test('mapLeaf', t => {
  t.plan(1);
  const res = mapLeafs(tree, l => {
    if (l.text === 'brain') return { text: 'changed' };
    else return l;
  });
  t.deepEquals(res, tree2);
});