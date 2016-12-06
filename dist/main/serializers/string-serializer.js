"use strict";
var b_exp_tree_1 = require('../b-exp-tree');
/**
 * Created by dennis on 29/11/2016.
 */
function toBoolString(tree) {
    /*
     Stringify query object into Boolean Algebra string:
     */
    // 1. Value is filter or text
    if (b_exp_tree_1.isFilter(tree))
        return tree.predicate + ":" + quotes(tree.text);
    if (b_exp_tree_1.isTerm(tree))
        return quotes(tree.text);
    // 2. Value is operator
    if (b_exp_tree_1.isBooleanOperator(tree.value)) {
        if (tree.value === 'NOT')
            return tree.value + " " + toBoolString(tree.right);
        return "(" + toBoolString(tree.left) + " " + tree.value + " " + toBoolString(tree.right) + ")";
    }
}
exports.toBoolString = toBoolString;
function quotes(text) {
    return /\s+/.test(text) ? "\"" + text + "\"" : text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9zZXJpYWxpemVycy9zdHJpbmctc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMkJBQThFLGVBQWUsQ0FBQyxDQUFBO0FBQzlGOztHQUVHO0FBQ0gsc0JBQTZCLElBQW1EO0lBQzlFOztPQUVHO0lBQ0QsNkJBQTZCO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLHFCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUksSUFBSSxDQUFDLFNBQVMsU0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUzQyx1QkFBdUI7SUFDdkIsRUFBRSxDQUFDLENBQUMsOEJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBSSxJQUFJLENBQUMsS0FBSyxTQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFHLENBQUM7UUFDN0UsTUFBTSxDQUFDLE1BQUksWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBSSxJQUFJLENBQUMsS0FBSyxTQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQUcsQ0FBQTtJQUNqRixDQUFDO0FBQ0wsQ0FBQztBQWJlLG9CQUFZLGVBYTNCLENBQUE7QUFFRCxnQkFBZ0IsSUFBSTtJQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFJLElBQUksT0FBRyxHQUFHLElBQUksQ0FBQztBQUMvQyxDQUFDIn0=