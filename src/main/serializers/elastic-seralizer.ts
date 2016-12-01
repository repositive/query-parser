import {BTree, SearchNode, isFilter, isTerm, isBooleanOperator} from "../b-tree";
/**
 * Created by dennis on 30/11/2016.
 */
export function toElasticQuery(tree:BTree<SearchNode>): any {

  const ops = {
    AND: 'must',
    OR: 'should',
    NOT: 'must_not'
  };

  function build(tree:BTree<SearchNode>): any {

    const value = tree.value;
    // 1. Value is filter or text
    if (isTerm(value) || isFilter(value)) {
      const key = isFilter(value) ? value.predicate : '_all';
      return {
        match: {
          [key]: value.text
        }
      }
    }

    if (isBooleanOperator(value)) {
      let children = [];
      if(tree.left) children.push(build(tree.left));
      if(tree.right) children.push(build(tree.right));
      return {
        bool: {
          [ops[value.operator]]: children
        }
      }
    }
  }

  return { query: build(tree) };


}
