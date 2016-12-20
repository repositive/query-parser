import {append} from 'ramda';

import {BTreeLeaf, BBTree, BooleanOperator, isTerm, isFilter, Filter} from "../b-exp-tree";
import {isBTree, map, filter, default as BTreeImp} from "../b-tree/index";
import {v4 as uuid } from 'uuid';

export function getPath(tree: BBTree | BTreeLeaf, id: string, acc: string[] = []) {
  if (tree._id === id) {
    return append(tree._id, acc);
  }
  else if(isBTree(tree)) {
    const newAcc = append(tree._id, acc);
    return (tree.left ? getPath(tree.left, id, newAcc) : null) || (tree.right ? getPath(tree.right, id, newAcc) : null)
  }
  else {
    return null;
  }
}

export function removeNodeByID(tree: BBTree | BTreeLeaf, id: string): BBTree | BTreeLeaf {
  console.log(`\n\n\nid: ${id}\n\n\n`);
  return map(tree, (t: BBTree | BTreeLeaf, l,r) => {
    if (isBTree(t) && t.value === 'NOT' && !l && !r) return null;
    if (isBTree(t) && t.value !== 'NOT' && !l) return r;
    if (isBTree(t) && t.value !== 'NOT' && !r) return l;
    if (t && t._id === id) return null;
    if (isBTree(t)) return new BTreeImp(t.value, l, r);
    return t;
  });
}

export function getFilters(tree: BBTree | BTreeLeaf): Filter[] {
  return <Filter[]> filter(tree, isFilter);
}

export function removeFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf {
  const filtered = filter(tree, val => {
    return isFilter(val) && val.text === text && val.predicate === predicate;
  });
  if (filtered.length === 0) return tree;
  return removeNodeByID(tree, (<Filter> filtered[0])._id);
}

export function addFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf {
  const filtered = <Filter[]> filter(tree, (t => {
    return isFilter(t) && t.predicate === predicate;
  }));

  const exists = filtered.filter(f => f.text === text);
  if (exists.length > 0) {
    return tree; // Or throw exception
  } else if (filtered.length === 0) {
    if (!tree)
      return <Filter> { _id: uuid(), text: text, predicate: predicate };
    else
      return new BTreeImp(<BooleanOperator>'AND', <Filter> { _id: uuid(), text: text, predicate: predicate }, tree);
  } else {
    const pred = filtered[0];
    return <BBTree> map(tree, (t, l, r) => {
      if (isFilter(t) && t._id === pred._id) {
        return <BBTree> new BTreeImp(<BooleanOperator>'OR', <Filter> { _id: uuid(), text: text, predicate: predicate }, t);
      }
      else if (isBTree(t)) {
        return new BTreeImp(t.value, l, r);
      } else if (isTerm(t)) {
        return t;
      }
    });
  }
}
