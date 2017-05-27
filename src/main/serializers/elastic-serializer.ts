import {BTree, isBTree} from '../b-tree/index';
import {BooleanOperator, BTreeLeaf, isFilter, isTerm} from '../b-exp-tree';
/**
 * Created by dennis on 30/11/2016.
 */
export function toElasticQuery(tree:BTree<BooleanOperator, BTreeLeaf>): any {

  const ops = {
    AND: 'must',
    OR: 'should',
    NOT: 'must_not'
  };

  function build(_tree: BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): any {

    // 1. Value is filter or text
    if (isBTree(_tree)) {
      const children = [];
      const left = build(_tree.left);
      const right = build(_tree.right);
      if (left) children.push(left);
      if (right) children.push(right);
      return {
        bool: {
          [ops[_tree.value]]: children
        }
      };
    } else if(isTerm(_tree)) {
      const key = isFilter(_tree) ? _tree.predicate : '_all';
      const type = /\s/.test(_tree.text) ? 'match_phrase' : 'match';
      return {
        [type]: {
          [key]: _tree.text
        }
      };
    } else {
      return undefined;
    }

  }

  let q = build(tree);
  if (!q) q = { 'match_all': {} };
  return { query: q };
}
