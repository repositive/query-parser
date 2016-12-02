import {BTree, SearchNode} from '../b-tree/index';
import {fold, map} from '../b-tree/functions'


export function filterExists(predicate: string, term: string, tree: BTree<SearchNode>): Boolean {
  return fold((acc, value) => {
    return acc || (value.predicate === predicate && value.text === term);
  }, tree, false)
}

export function predicateExists(predicate: string, tree: BTree<SearchNode>): Boolean {
  return fold((acc, value) => acc || value.predicate === predicate, tree, false);
}

export function insertFilter(predicate: string, term: string, tree: BTree<SearchNode>): BTree<SearchNode> {

  if (filterExists(predicate, term, tree)) {
    return tree;
  } else if (predicateExists(predicate, tree)) {
    // TODO: Allow multiple filters of same type.
    // Replace at appropriate position
    return map(t => {
      if (t && t.predicate === predicate) {
        t.text = term;
      }
      return t;
    }, tree);
  } else {
    // Insert new AND as root.
    return {
      value: {
        operator: 'AND'
      },
      left: tree,
      right: {
        value: {
          predicate: predicate,
          text: term
        }
      }
    }
  }
}
