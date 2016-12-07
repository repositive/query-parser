"use strict";
var b_exp_tree_1 = require('../b-exp-tree');
/**
 * Created by dennis on 29/11/2016.
 */
function toBoolString(tree) {
    /*
     Stringify query object into Boolean Algebra string:
     */
    if (!tree)
        return ''; // Account for empty query
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9zZXJpYWxpemVycy9zdHJpbmctc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMkJBQThFLGVBQWUsQ0FBQyxDQUFBO0FBQzlGOztHQUVHO0FBQ0gsc0JBQTZCLElBQW1EO0lBQzlFOztPQUVHO0lBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsMEJBQTBCO0lBQ2hELDZCQUE2QjtJQUM3QixFQUFFLENBQUMsQ0FBQyxxQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFJLElBQUksQ0FBQyxTQUFTLFNBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztJQUNwRSxFQUFFLENBQUMsQ0FBQyxtQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsdUJBQXVCO0lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLDhCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUksSUFBSSxDQUFDLEtBQUssU0FBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxNQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQUksSUFBSSxDQUFDLEtBQUssU0FBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFHLENBQUE7SUFDakYsQ0FBQztBQUNILENBQUM7QUFkZSxvQkFBWSxlQWMzQixDQUFBO0FBRUQsZ0JBQWdCLElBQUk7SUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBSSxJQUFJLE9BQUcsR0FBRyxJQUFJLENBQUM7QUFDL0MsQ0FBQyJ9