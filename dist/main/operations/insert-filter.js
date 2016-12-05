"use strict";
const index_1 = require('../b-tree/index');
const b_exp_tree_1 = require('../b-exp-tree');
function filterExists(predicate, term, tree) {
    return index_1.filter(tree, (value) => {
        if (b_exp_tree_1.isFilter(value)) {
            return value.predicate === predicate && value.text === term;
        }
        return false;
    }) !== null;
}
exports.filterExists = filterExists;
function predicateExists(predicate, tree) {
    return index_1.filter(tree, (value) => b_exp_tree_1.isFilter(value) && value.predicate === predicate) !== null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL29wZXJhdGlvbnMvaW5zZXJ0LWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0JBQWtDLGlCQUFpQixDQUFDLENBQUE7QUFDcEQsNkJBQWlFLGVBQWUsQ0FBQyxDQUFBO0FBR2pGLHNCQUE2QixTQUFpQixFQUFFLElBQVksRUFBRSxJQUF1QztJQUNuRyxNQUFNLENBQUMsY0FBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUs7UUFDeEIsRUFBRSxDQUFDLENBQUMscUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQzlELENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVBlLG9CQUFZLGVBTzNCLENBQUE7QUFFRCx5QkFBZ0MsU0FBaUIsRUFBRSxJQUF1QztJQUN4RixNQUFNLENBQUMsY0FBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxxQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQzVGLENBQUM7QUFGZSx1QkFBZSxrQkFFOUIsQ0FBQTtBQUVELHNCQUE2QixTQUFpQixFQUFFLElBQVksRUFBRSxJQUFtRDtJQUMvRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUZlLG9CQUFZLGVBRTNCLENBQUE7QUFFRCxtSUFBbUk7QUFDbkksRUFBRTtBQUNGLDhDQUE4QztBQUM5QyxrQkFBa0I7QUFDbEIsa0RBQWtEO0FBQ2xELG1EQUFtRDtBQUNuRCx3Q0FBd0M7QUFDeEMsdUJBQXVCO0FBQ3ZCLDZDQUE2QztBQUM3Qyx3QkFBd0I7QUFDeEIsU0FBUztBQUNULGlCQUFpQjtBQUNqQixlQUFlO0FBQ2YsWUFBWTtBQUNaLGdDQUFnQztBQUNoQyxjQUFjO0FBQ2QsZ0JBQWdCO0FBQ2hCLHlCQUF5QjtBQUN6QixVQUFVO0FBQ1YsbUJBQW1CO0FBQ25CLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIsaUNBQWlDO0FBQ2pDLHNCQUFzQjtBQUN0QixXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRyJ9