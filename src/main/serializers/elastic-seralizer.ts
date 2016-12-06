import {BTree, isBTree} from "../b-tree/index";
import {BooleanOperator, BTreeLeaf, isFilter, isTerm, isBooleanOperator} from '../b-exp-tree';
/**
 * Created by dennis on 30/11/2016.
 */
export function toElasticQuery(tree:BTree<BooleanOperator, BTreeLeaf>): any {

  const ops = {
    AND: 'must',
    OR: 'should',
    NOT: 'must_not'
  };

  function build(tree:BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): any {

    // 1. Value is filter or text
    if (isBTree(tree)) {
      let children = [];
      const left = build(tree.left);
      const right = build(tree.right);
      if (left) children.push(left);
      if (right) children.push(right);
      return {
        bool: {
          [ops[tree.value]]: children
        }
      }
    }
    else if(isTerm(tree)) {
      const key = isFilter(tree) ? tree.predicate : '_all';
      return {
        match: {
          [key]: tree.text
        }
      }
    }
    else {
      return null;
    }

  }

  return { query: build(tree) };
}
