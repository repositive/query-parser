// import {BTree, default as BTreeImp} from '../b-tree/index';
// import {SearchNode} from '../b-exp-tree';
// import {fold} from '../b-tree/index';
// import {concat} from 'ramda';
//
// export function getPath<O, T>(id: string, tree: BTreeImp<O, T> | T, acc: string[]): string[] {
//   if (tree['_id'] !== id) return getPath(id, tree['left'], concat(acc, [id]));
//   else return acc;
// }
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
