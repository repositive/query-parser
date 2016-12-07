"use strict";
// import {BTree, default as BTreeImp} from '../b-tree/index';
// import {SearchNode} from '../b-exp-tree';
// import {fold} from '../b-tree/index';
var ramda_1 = require('ramda');
var index_1 = require("../b-tree/index");
function getPath(tree, id, acc) {
    if (acc === void 0) { acc = []; }
    if (tree._id === id) {
        return ramda_1.append(tree._id, acc);
    }
    else if (index_1.isBTree(tree)) {
        var newAcc = ramda_1.append(tree._id, acc);
        return (tree.left ? getPath(tree.left, id, newAcc) : null) || (tree.right ? getPath(tree.right, id, newAcc) : null);
    }
    else {
        return null;
    }
}
exports.getPath = getPath;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL29wZXJhdGlvbnMvZmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOERBQThEO0FBQzlELDRDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMsc0JBQXFCLE9BQU8sQ0FBQyxDQUFBO0FBSTdCLHNCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLGlCQUF3QixJQUF3QixFQUFFLEVBQVUsRUFBRSxHQUFrQjtJQUFsQixtQkFBa0IsR0FBbEIsUUFBa0I7SUFDOUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxjQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBTSxNQUFNLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtJQUNySCxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUM7QUFYZSxlQUFPLFVBV3RCLENBQUE7QUFFRCxFQUFFO0FBQ0YseURBQXlEO0FBQ3pELGdCQUFnQjtBQUNoQixJQUFJO0FBQ0osRUFBRTtBQUNGLEVBQUU7QUFDRixvR0FBb0c7QUFDcEcsa0NBQWtDO0FBQ2xDLDRFQUE0RTtBQUM1RSxvQkFBb0I7QUFDcEIsSUFBSTtBQUNKLEVBQUU7QUFDRix5RkFBeUY7QUFDekYsb0ZBQW9GO0FBQ3BGLElBQUk7QUFDSixFQUFFO0FBQ0YscUdBQXFHO0FBQ3JHLEVBQUU7QUFDRiwrQ0FBK0M7QUFDL0MsbUJBQW1CO0FBQ25CLG1EQUFtRDtBQUNuRCxvREFBb0Q7QUFDcEQseUNBQXlDO0FBQ3pDLHdCQUF3QjtBQUN4Qiw4Q0FBOEM7QUFDOUMseUJBQXlCO0FBQ3pCLFVBQVU7QUFDVixrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYixpQ0FBaUM7QUFDakMsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQiwwQkFBMEI7QUFDMUIsV0FBVztBQUNYLG9CQUFvQjtBQUNwQixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLGtDQUFrQztBQUNsQyx1QkFBdUI7QUFDdkIsWUFBWTtBQUNaLFVBQVU7QUFDVixRQUFRO0FBQ1IsTUFBTTtBQUNOLElBQUkifQ==