"use strict";
var index_1 = require('../b-tree/index');
var b_exp_tree_1 = require('../b-exp-tree');
function filterExists(predicate, term, tree) {
    return index_1.filter(tree, function (value) {
        if (b_exp_tree_1.isFilter(value)) {
            return value.predicate === predicate && value.text === term;
        }
        return false;
    }) !== null;
}
exports.filterExists = filterExists;
function predicateExists(predicate, tree) {
    return index_1.filter(tree, function (value) { return b_exp_tree_1.isFilter(value) && value.predicate === predicate; }) !== null;
}
exports.predicateExists = predicateExists;
function insertFilter(predicate, term, tree) {
    return null;
}
exports.insertFilter = insertFilter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL29wZXJhdGlvbnMvaW5zZXJ0LWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQWtDLGlCQUFpQixDQUFDLENBQUE7QUFDcEQsMkJBQWlFLGVBQWUsQ0FBQyxDQUFBO0FBR2pGLHNCQUE2QixTQUFpQixFQUFFLElBQVksRUFBRSxJQUF1QztJQUNuRyxNQUFNLENBQUMsY0FBTSxDQUFDLElBQUksRUFBRSxVQUFDLEtBQUs7UUFDeEIsRUFBRSxDQUFDLENBQUMscUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQzlELENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVBlLG9CQUFZLGVBTzNCLENBQUE7QUFFRCx5QkFBZ0MsU0FBaUIsRUFBRSxJQUF1QztJQUN4RixNQUFNLENBQUMsY0FBTSxDQUFDLElBQUksRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLHFCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQWhELENBQWdELENBQUMsS0FBSyxJQUFJLENBQUM7QUFDNUYsQ0FBQztBQUZlLHVCQUFlLGtCQUU5QixDQUFBO0FBRUQsc0JBQTZCLFNBQWlCLEVBQUUsSUFBWSxFQUFFLElBQW1EO0lBQy9HLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRmUsb0JBQVksZUFFM0IsQ0FBQTtBQUVELG1JQUFtSTtBQUNuSSxFQUFFO0FBQ0YsOENBQThDO0FBQzlDLGtCQUFrQjtBQUNsQixrREFBa0Q7QUFDbEQsbURBQW1EO0FBQ25ELHdDQUF3QztBQUN4Qyx1QkFBdUI7QUFDdkIsNkNBQTZDO0FBQzdDLHdCQUF3QjtBQUN4QixTQUFTO0FBQ1QsaUJBQWlCO0FBQ2pCLGVBQWU7QUFDZixZQUFZO0FBQ1osZ0NBQWdDO0FBQ2hDLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCLFVBQVU7QUFDVixtQkFBbUI7QUFDbkIsZ0JBQWdCO0FBQ2hCLGtCQUFrQjtBQUNsQixpQ0FBaUM7QUFDakMsc0JBQXNCO0FBQ3RCLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHIn0=