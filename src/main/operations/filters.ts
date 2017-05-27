import {append} from 'ramda';

import {BTreeLeaf, BBTree, BooleanOperator, isFilter, Filter} from '../b-exp-tree';
import {isBTree, map, filter, default as BTreeImp} from '../b-tree/index';
import {v4 as uuid } from 'uuid';

export function getPath(tree: BBTree | BTreeLeaf, id: string, acc: string[] = []) {
  if (tree._id === id) {
    return append(tree._id, acc);
  } else if(isBTree(tree)) {
    const newAcc = append(tree._id, acc);
    return (tree.left ? getPath(tree.left, id, newAcc) : undefined) || (tree.right ? getPath(tree.right, id, newAcc) : undefined);
  } else {
    return undefined;
  }
}

export function removeNodeByID(tree: BBTree | BTreeLeaf, id: string): BBTree | BTreeLeaf {
  return map(tree, (t: BBTree | BTreeLeaf, l,r) => {
    if (isBTree(t) && t.value === 'NOT' && !l && !r) return undefined;
    if (isBTree(t) && t.value !== 'NOT' && !l) return r;
    if (isBTree(t) && t.value !== 'NOT' && !r) return l;
    if (t && t._id === id) return undefined;
    if (isBTree(t)) return new BTreeImp(t.value, l, r);
    return t;
  });
}

export function getFilters(tree: BBTree | BTreeLeaf): Filter[] {
  return <Filter[]> filter(tree, isFilter);
}

export function removeFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf {

  return map(tree, (t: BBTree | BTreeLeaf, l, r) => {
    if (isFilter(t) && t.text === text && t.predicate === predicate) return undefined;
    if (isBTree(t) && t.value !== undefined && !l && !r) return undefined;
    if (isBTree(t) && t.value !== 'NOT' && (!l || !r)) return l || r;
    if (isBTree(t)) return {value: t.value, right: r, left: l};
    return t;
  });
}

export function addFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf {
  const filtered = <Filter[]> filter(tree, (t => {
    return isFilter(t) && t.predicate === predicate;
  }));

  const exists = filtered.filter(f => f.text === text);
  if (exists.length > 0) {
    return tree; // Or throw exception
  } else {
    if (!tree)
      return <Filter> { _id: uuid(), text, predicate };
    else
      return new BTreeImp(<BooleanOperator>'AND', <Filter> { _id: uuid(), text, predicate }, tree);

  }
}
