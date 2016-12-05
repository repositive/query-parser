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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL29wZXJhdGlvbnMvZmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4REFBOEQ7QUFDOUQsNENBQTRDO0FBQzVDLHdDQUF3QztBQUN4QyxnQ0FBZ0M7QUFDaEMsRUFBRTtBQUNGLGlHQUFpRztBQUNqRyxpRkFBaUY7QUFDakYscUJBQXFCO0FBQ3JCLElBQUk7QUFDSixFQUFFO0FBQ0YseURBQXlEO0FBQ3pELGdCQUFnQjtBQUNoQixJQUFJO0FBQ0osRUFBRTtBQUNGLEVBQUU7QUFDRixvR0FBb0c7QUFDcEcsa0NBQWtDO0FBQ2xDLDRFQUE0RTtBQUM1RSxvQkFBb0I7QUFDcEIsSUFBSTtBQUNKLEVBQUU7QUFDRix5RkFBeUY7QUFDekYsb0ZBQW9GO0FBQ3BGLElBQUk7QUFDSixFQUFFO0FBQ0YscUdBQXFHO0FBQ3JHLEVBQUU7QUFDRiwrQ0FBK0M7QUFDL0MsbUJBQW1CO0FBQ25CLG1EQUFtRDtBQUNuRCxvREFBb0Q7QUFDcEQseUNBQXlDO0FBQ3pDLHdCQUF3QjtBQUN4Qiw4Q0FBOEM7QUFDOUMseUJBQXlCO0FBQ3pCLFVBQVU7QUFDVixrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYixpQ0FBaUM7QUFDakMsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQiwwQkFBMEI7QUFDMUIsV0FBVztBQUNYLG9CQUFvQjtBQUNwQixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLGtDQUFrQztBQUNsQyx1QkFBdUI7QUFDdkIsWUFBWTtBQUNaLFVBQVU7QUFDVixRQUFRO0FBQ1IsTUFBTTtBQUNOLElBQUkifQ==