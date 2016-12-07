"use strict";
var test = require('tape');
var index_1 = require("../../main/b-tree/index");
var query_parser_1 = require("../../main/parsers/query-parser");
var b_exp_tree_1 = require("../../main/b-exp-tree");
var tree = query_parser_1.parseString('cancer AND (brain OR breast)');
var tree2 = query_parser_1.parseString('cancer AND (changed OR breast)');
//TODO: Resolve test problems with ids
test.skip('map identity', function (t) {
    t.plan(2);
    t.deepEquals(tree, index_1.map(tree, function (t) { return t; }));
    var res = index_1.map(tree, function (t, l, r) {
        if (b_exp_tree_1.isTerm(t) && t.text === 'brain') {
            return {
                text: 'changed'
            };
        }
        else if (index_1.isBTree(t)) {
            return {
                value: t.value,
                right: r,
                left: l
            };
        }
        else {
            return t;
        }
    });
    t.deepEquals(tree2, res);
});
//TODO: Resolve test problems with ids
test.skip('mapLeaf', function (t) {
    t.plan(1);
    var res = index_1.mapLeafs(tree, function (l) {
        if (l.text === 'brain')
            return { text: 'changed' };
        else
            return l;
    });
    t.deepEquals(res, tree2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYi10cmVlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvYi10cmVlL2ItdHJlZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUM3QixzQkFBcUMseUJBQXlCLENBQUMsQ0FBQTtBQUMvRCw2QkFBMEIsaUNBQWlDLENBQUMsQ0FBQTtBQUM1RCwyQkFBcUIsdUJBQXVCLENBQUMsQ0FBQTtBQUU3QyxJQUFNLElBQUksR0FBRywwQkFBVyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBTSxLQUFLLEdBQUcsMEJBQVcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTVELHNDQUFzQztBQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFBLENBQUM7SUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxJQUFNLEdBQUcsR0FBRyxXQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLG1CQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQztnQkFDTCxJQUFJLEVBQUUsU0FBUzthQUNoQixDQUFBO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQztnQkFDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLENBQUM7YUFDUixDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDO0FBRUgsc0NBQXNDO0FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQztJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsSUFBTSxHQUFHLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQ25ELElBQUk7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUMifQ==