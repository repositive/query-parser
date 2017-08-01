// import {BTree, isBTree, fold} from '../b-tree/index';
// import {BooleanOperator, BTreeLeaf, isFilter, isTerm} from '../b-exp-tree';

import { isExpression, isPredicate, isToken, Expression, Node, fold } from '../b-tree';

function shouldWrap(tree: Expression<Node, Node>, branch: string): boolean {
  return isExpression(tree[branch]) && tree[branch].value !== tree.value;
}

function quotes(text) {
  return /\s+/.test(text) ? `"${text}"` : text;
}

//
// /**
//  * Created by dennis on 29/11/2016.
//  */
export function toBoolString(tree: Node): string {
  return fold(tree, (elem, l, r) => {
    if (isExpression(elem)) {
      const nL = shouldWrap(elem, 'left') ? `(${l})` : l;
      const nR = shouldWrap(elem, 'right') ? `(${r})` : r;
      if(elem.value === 'AND') {
        return `${nL} ${nR}`;
      } else {
        return `${nL} ${elem.value} ${nR}`;
      }
    } else if (isPredicate(elem)) {
      if (elem.relation === '=') {
        return `${elem.key}:${quotes(elem.value)}`;
      } else {
        return `${elem.key}:${elem.relation}${quotes(elem.value)}`;
      }
    } else if (isToken(elem)) {
      return quotes(elem.value);
    } else {
      return l + r;
    }

  }, '');
}
