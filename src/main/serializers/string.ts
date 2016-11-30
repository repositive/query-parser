import {BTree, isTerm, isFilter} from "../b-tree";
/**
 * Created by dennis on 29/11/2016.
 */
export function toBoolString(query:BTree): string {
  /*
   Stringify query object into Boolean Algebra string:
   1. Recursively iterate over tree structure
   3. Concatenate leafs using the root's operator.
   */

  function traverse(tree:BTree) {
    // 1. Value is filter or text
    const value = tree.value;
    if (isTerm(value)) return value.text;
    if (isFilter(value)) return `${value.predicate}:${value.text}`;

    // 2. Value is operator
  }


}