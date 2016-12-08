import {BTree, isBTree, fold} from "../b-tree/index";
import {BooleanOperator, BTreeLeaf, isFilter, isTerm, isBooleanOperator} from '../b-exp-tree';

function shouldWrap(tree: BTree<BooleanOperator, BTreeLeaf>, branch: string): boolean {
  return isBTree(tree[branch]) && tree[branch].value !== 'NOT' && tree[branch].value !== tree.value;
}

function quotes(text) {
  return /\s+/.test(text) ? `"${text}"` : text;
}

/**
 * Created by dennis on 29/11/2016.
 */
export function toBoolString(tree: BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): string {
  return fold(tree, (elem, l, r) => {
    if (isBTree(elem)) {
      const nL = shouldWrap(elem, 'left') ? `(${l})` : l;
      const nR = shouldWrap(elem, 'right') ? `(${r})` : r;

      if (elem.value === 'NOT') {
        return `${elem.value} ${nR}`
      }
      else if(elem.value === 'AND') {
        return `${nL} ${nR}`;
      }
      else {
        return `${nL} ${elem.value} ${nR}`;
      }
    }
    else if (isFilter(elem)) {
      return `${elem.predicate}:${quotes(elem.text)}`;
    }
    else if (isTerm(elem)) {
      return quotes(elem.text);
    }
    else {
      return l + r
    }
  
  }, '')
}
