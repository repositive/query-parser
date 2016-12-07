"use strict";
var index_1 = require("../b-tree/index");
var b_exp_tree_1 = require('../b-exp-tree');
/**
 * Created by dennis on 30/11/2016.
 */
function toElasticQuery(tree) {
    var ops = {
        AND: 'must',
        OR: 'should',
        NOT: 'must_not'
    };
    function build(tree) {
        // 1. Value is filter or text
        if (index_1.isBTree(tree)) {
            var children = [];
            var left = build(tree.left);
            var right = build(tree.right);
            if (left)
                children.push(left);
            if (right)
                children.push(right);
            return {
                bool: (_a = {},
                    _a[ops[tree.value]] = children,
                    _a
                )
            };
        }
        else if (b_exp_tree_1.isTerm(tree)) {
            var key = b_exp_tree_1.isFilter(tree) ? tree.predicate : '_all';
            return {
                match: (_b = {},
                    _b[key] = tree.text,
                    _b
                )
            };
        }
        else {
            return null;
        }
        var _a, _b;
    }
    return { query: build(tree) };
}
exports.toElasticQuery = toElasticQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxhc3RpYy1zZXJhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9zZXJpYWxpemVycy9lbGFzdGljLXNlcmFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQTZCLGlCQUFpQixDQUFDLENBQUE7QUFDL0MsMkJBQThFLGVBQWUsQ0FBQyxDQUFBO0FBQzlGOztHQUVHO0FBQ0gsd0JBQStCLElBQXNDO0lBRW5FLElBQU0sR0FBRyxHQUFHO1FBQ1YsR0FBRyxFQUFFLE1BQU07UUFDWCxFQUFFLEVBQUUsUUFBUTtRQUNaLEdBQUcsRUFBRSxVQUFVO0tBQ2hCLENBQUM7SUFFRixlQUFlLElBQWtEO1FBRS9ELDZCQUE2QjtRQUM3QixFQUFFLENBQUMsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO2dCQUNMLElBQUksRUFBRTtvQkFDSixHQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRSxRQUFROztpQkFDNUI7YUFDRixDQUFBO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxtQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFNLEdBQUcsR0FBRyxxQkFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3JELE1BQU0sQ0FBQztnQkFDTCxLQUFLLEVBQUU7b0JBQ0wsR0FBQyxHQUFHLENBQUMsR0FBRSxJQUFJLENBQUMsSUFBSTs7aUJBQ2pCO2FBQ0YsQ0FBQTtRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDOztJQUVILENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDaEMsQ0FBQztBQXRDZSxzQkFBYyxpQkFzQzdCLENBQUEifQ==