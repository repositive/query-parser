import {append} from 'ramda';

import {BTreeLeaf, BBTree, BooleanOperator, isTerm, isFilter, Filter} from "../b-exp-tree";
import {isBTree, fold, map, filter, default as BTreeImp, BTree, mapLeafs} from "../b-tree/index";

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

export function removeByID(tree: BBTree | BTreeLeaf, id: string): BBTree | BTreeLeaf {
  return map(tree, (t: BBTree | BTreeLeaf, l,r) => {
    if (t && t._id === id) return null;
    // if (isBTree(t) && t.left && t.right) {
    //   if ((!l && !t.left && (<BBTree | BTreeLeaf> t.left)._id === l._id) &&
    //     (!r && !t.right && (<BBTree | BTreeLeaf> t.right)._id === r._id)) {
    //     return t;
    //   }
    // }
    if (isBTree(t) && t.value === 'NOT' && !l && !r) return null;
    if (isBTree(t) && t.value !== 'NOT' && !l) return r;
    if (isBTree(t) && t.value !== 'NOT' && !r) return l;
    if (isBTree(t)) return new BTreeImp(t.value, l, r);
    return t;
  });
}


export function removeFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf {
  const filtered = filter(tree, val => {
    return isFilter(val) && val.text === text && val.predicate === predicate;
  });
  if (filtered.length === 0) return tree;
  return removeByID(tree, (<Filter> filtered[0])._id);
}

export function addFilter(tree: BBTree | BTreeLeaf, predicate: string, text: string): BBTree | BTreeLeaf {

  // const exists = fold<BooleanOperator, BTreeLeaf, Boolean>(tree, (acc, value) => {
  //   return (isFilter(value) && value.predicate === predicate && value.text === text) || acc;
  // }, false);
  // if (exists) return tree;
  //
  // const predID = fold<BooleanOperator, BTreeLeaf, string>(tree, (acc, value) => {
  //   if (isFilter(value) && value.predicate === predicate) {
  //     return value._id;
  //   }
  //   return acc;
  // }, '');

  const filtered = <Filter[]> filter(tree, (t => {
    return isFilter(t) && t.predicate === predicate
  }));

  const exists = filtered.filter(f => f.text === text);
  if (exists.length > 0) {
    return tree; // Or throw exception
  } else if (filtered.length === 0) {
     return new BTreeImp(<BooleanOperator>'AND', tree, <Filter> { text: text, predicate: predicate });
  } else {
    const pred = filtered[0];
    return <BBTree> map(tree, (t, l, r) => {
      if (isFilter(t) && t._id === pred._id) {
        return <BBTree> new BTreeImp(<BooleanOperator>'OR', <Filter> { text: text, predicate: predicate }, t);
      }
      else if (isBTree(t)) {
        return new BTreeImp(t.value, l, r);
      } else if (isTerm(t)) {
        return t;
      }
    });
  }



  // if (predID) {
  //   // Add filter using OR
  //   // const path = getPath(tree, predID);
  //   return map(tree, (t: BBTree | BTreeLeaf, l, r) => {
  //     if (isFilter(t) && t._id === predID) {
  //       return {
  //         value: 'OR',
  //         right: t,
  //         left: {
  //           _id: uuid(),
  //           predicate: predicate,
  //           text: text
  //         }
  //       }
  //     } else if (isBTree(t)) {
  //       return {
  //         _id: uuid(),
  //         value: t.value,
  //         right: r,
  //         left: l
  //       }
  //     } else {
  //       return t;
  //     }
  //   });
  //   // Add new filter
  // } else {
  //
  // }
  // console.log(`\nPredicate Exists: ${predID}\n`);
}


//
// function remove<O, T>(id: string, tree: BTree<O, T>) {
//   // Get path
// }
//
//
// export function filterExists(predicate: string, term: string, tree: BTree<SearchNode>): Boolean {
//   return fold((acc, value) => {
//     return acc || (value.predicate === predicate && value.text === term);
//   }, tree, false)
// }
//
// export function predicateExists(predicate: string, tree: BTree<SearchNode>): Boolean {
//   return fold((acc, value) => acc || value.predicate === predicate, tree, false);
// }
//
// export function add(predicate: string, term: string, tree: BTree<SearchNode>): BTree<SearchNode> {
//
//   if (filterExists(predicate, term, tree)) {
//     return tree;
//   } else if (predicateExists(predicate, tree)) {
//     // TODO: Allow multiple filters of same type.
//     // Replace at appropriate position
//     return map(t => {
//       if (t && t.predicate === predicate) {
//         t.text = term;
//       }
//       return t;
//     }, tree);
//   } else {
//     // Insert new AND as root.
//     return {
//       value: {
//         operator: 'AND'
//       },
//       left: tree,
//       right: {
//         value: {
//           predicate: predicate,
//           text: term
//         }
//       }
//     }
//   }
// }
