import {BTree, isTerm, isFilter, isBooleanOperator, SearchNode} from "../b-tree";
/**
 * Created by dennis on 29/11/2016.
 */
export function toBoolString(tree:BTree<SearchNode>): string {
  /*
   Stringify query object into Boolean Algebra string:
   */
    const value = tree.value;

    // 1. Value is filter or text
    if (isFilter(value)) return `${value.predicate}:${value.text}`;
    if (isTerm(value)) return value.text;

    // 2. Value is operator
    if (isBooleanOperator(value)) {
      if (value.operator === 'NOT') return `${value.operator} ${toBoolString(tree.right)}`;
      return `(${toBoolString(tree.left)} ${value.operator} ${toBoolString(tree.right)})`
    }
}
