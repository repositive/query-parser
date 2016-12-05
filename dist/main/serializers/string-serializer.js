"use strict";
const b_exp_tree_1 = require('../b-exp-tree');
/**
 * Created by dennis on 29/11/2016.
 */
function toBoolString(tree) {
    /*
     Stringify query object into Boolean Algebra string:
     */
    // 1. Value is filter or text
    if (b_exp_tree_1.isFilter(tree))
        return `${tree.predicate}:${quotes(tree.text)}`;
    if (b_exp_tree_1.isTerm(tree))
        return quotes(tree.text);
    // 2. Value is operator
    if (b_exp_tree_1.isBooleanOperator(tree.value)) {
        if (tree.value === 'NOT')
            return `${tree.value} ${toBoolString(tree.right)}`;
        return `(${toBoolString(tree.left)} ${tree.value} ${toBoolString(tree.right)})`;
    }
}
exports.toBoolString = toBoolString;
function quotes(text) {
    return /\s+/.test(text) ? `"${text}"` : text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9zZXJpYWxpemVycy9zdHJpbmctc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNkJBQThFLGVBQWUsQ0FBQyxDQUFBO0FBQzlGOztHQUVHO0FBQ0gsc0JBQTZCLElBQW1EO0lBQzlFOztPQUVHO0lBQ0QsNkJBQTZCO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLHFCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNwRSxFQUFFLENBQUMsQ0FBQyxtQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0MsdUJBQXVCO0lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLDhCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUM3RSxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBO0lBQ2pGLENBQUM7QUFDTCxDQUFDO0FBYmUsb0JBQVksZUFhM0IsQ0FBQTtBQUVELGdCQUFnQixJQUFJO0lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQy9DLENBQUMifQ==