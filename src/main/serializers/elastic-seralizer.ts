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
      children.push(build(tree.left));
      children.push(build(tree.right));
      return {
        bool: {
          [ops[tree.value.operator]]: children
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
