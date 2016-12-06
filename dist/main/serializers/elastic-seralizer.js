"use strict";
const index_1 = require("../b-tree/index");
const b_exp_tree_1 = require('../b-exp-tree');
/**
 * Created by dennis on 30/11/2016.
 */
function toElasticQuery(tree) {
    const ops = {
        AND: 'must',
        OR: 'should',
        NOT: 'must_not'
    };
    function build(tree) {
        // 1. Value is filter or text
        if (index_1.isBTree(tree)) {
            let children = [];
            const left = build(tree.left);
            const right = build(tree.right);
            if (left)
                children.push(left);
            if (right)
                children.push(right);
            return {
                bool: {
                    [ops[tree.value]]: children
                }
            };
        }
        else if (b_exp_tree_1.isTerm(tree)) {
            const key = b_exp_tree_1.isFilter(tree) ? tree.predicate : '_all';
            return {
                match: {
                    [key]: tree.text
                }
            };
        }
        else {
            return null;
        }
    }
    return { query: build(tree) };
}
exports.toElasticQuery = toElasticQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1zZXJhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9zZXJpYWxpemVycy9lbGFzdGljLXNlcmFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0JBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsNkJBQThFLGVBQWUsQ0FBQyxDQUFBO0FBQzlGOztHQUVHO0FBQ0gsd0JBQStCLElBQXNDO0lBRW5FLE1BQU0sR0FBRyxHQUFHO1FBQ1YsR0FBRyxFQUFFLE1BQU07UUFDWCxFQUFFLEVBQUUsUUFBUTtRQUNaLEdBQUcsRUFBRSxVQUFVO0tBQ2hCLENBQUM7SUFFRixlQUFlLElBQWtEO1FBRS9ELDZCQUE2QjtRQUM3QixFQUFFLENBQUMsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO2dCQUNMLElBQUksRUFBRTtvQkFDSixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRO2lCQUM1QjthQUNGLENBQUE7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sR0FBRyxHQUFHLHFCQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDckQsTUFBTSxDQUFDO2dCQUNMLEtBQUssRUFBRTtvQkFDTCxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJO2lCQUNqQjthQUNGLENBQUE7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUVILENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDaEMsQ0FBQztBQXRDZSxzQkFBYyxpQkFzQzdCLENBQUEifQ==