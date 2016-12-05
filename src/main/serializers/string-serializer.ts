import {BTree, isBTree} from "../b-tree/index";
import {BooleanOperator, BTreeLeaf, isFilter, isTerm, isBooleanOperator} from '../b-exp-tree';
/**
 * Created by dennis on 29/11/2016.
 */
export function toBoolString(tree: BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): string {
  /*
   Stringify query object into Boolean Algebra string:
   */
    // 1. Value is filter or text
    if (isFilter(tree)) return `${tree.predicate}:${quotes(tree.text)}`;
    if (isTerm(tree)) return quotes(tree.text);

    // 2. Value is operator
    if (isBooleanOperator(tree.value)) {
      if (tree.value.operator === 'NOT') return `${tree.value.operator} ${toBoolString(tree.right)}`;
      return `(${toBoolString(tree.left)} ${tree.value.operator} ${toBoolString(tree.right)})`
    }
}

function quotes(text) {
  return /\s+/.test(text) ? `"${text}"` : text;
}
