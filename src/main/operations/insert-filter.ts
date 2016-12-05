import {BTree, fold, filter} from '../b-tree/index';
import {BooleanOperator, BTreeLeaf, Filter, Term, isFilter} from '../b-exp-tree';


export function filterExists(predicate: string, term: string, tree: BTree<BooleanOperator, BTreeLeaf>): Boolean {
  return filter(tree, (value) => {
    if (isFilter(value)) {
      return value.predicate === predicate && value.text === term;
    }
    return false;
  }) !== null;
}

export function predicateExists(predicate: string, tree: BTree<BooleanOperator, BTreeLeaf>): Boolean {
  return filter(tree, (value) => isFilter(value) && value.predicate === predicate) !== null;
}

export function insertFilter(predicate: string, term: string, tree: BTree<BooleanOperator, BTreeLeaf> | BTreeLeaf): BTree<BooleanOperator, BTreeLeaf> {
  return null;
}

//export function insertFilter(predicate: string, term: string, tree: BTree<BooleanOperator, Term>): BTree<BooleanOperator, Term> {
//
//  if (filterExists(predicate, term, tree)) {
//    return tree;
//  } else if (predicateExists(predicate, tree)) {
//    // TODO: Allow multiple filters of same type.
//    // Replace at appropriate position
//    return map(t => {
//      if (t && t.predicate === predicate) {
//        t.text = term;
//      }
//      return t;
//    }, tree);
//  } else {
//    // Insert new AND as root.
//    return {
//      value: {
//        operator: 'AND'
//      },
//      left: tree,
//      right: {
//        value: {
//          predicate: predicate,
//          text: term
//        }
//      }
//    }
//  }
//}
