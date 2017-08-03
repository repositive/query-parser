import {
  isAND, isNOT, isOR, isPredicate, isToken, Expression, Node, fold
} from '../b-tree';

function shouldWrap(tree: any, branch: string): boolean {
  return (isAND(tree[branch]) || isOR(tree[branch])) && tree[branch]._type !== tree._type;
}

function quotes(text) {
  return /\s+/.test(text) ? `"${text}"` : text;
}

export function toNatural(tree: Node): string {
  return fold(tree, (elem, l, r) => {
    if (isAND(elem) || isOR(elem)) {
      const nL = shouldWrap(elem, 'left') ? `(${l})` : l;
      const nR = shouldWrap(elem, 'right') ? `(${r})` : r;
      if(elem._type === 'AND') {
        return `${nL} ${nR}`;
      } else {
        return `${nL} ${elem._type} ${nR}`;
      }
    } else if (isNOT(elem)) {
      const ser = toNatural(elem.negated);
      const wrapped = shouldWrap(elem, 'negated') ? `(${ser})` : ser;
      return  `NOT ${wrapped}`;
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
