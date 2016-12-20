"use strict";
var test = require('tape');
var index_1 = require('../../main/b-tree/index');
var b_exp_tree_1 = require('../../main/b-exp-tree');
var filters_1 = require('../../main/operations/filters');
var string_serializer_1 = require('../../main/serializers/string-serializer');
var query_parser_1 = require('../../main/parsers/query-parser');
var simpleTree1 = {
    text: 'cancer'
};
var simpleTree2 = {
    value: 'AND',
    left: {
        text: 'cancer'
    },
    right: {
        text: 'RNA-Seq',
        predicate: 'assay'
    }
};
var tree1 = {
    value: 'AND',
    left: {
        text: 'glaucoma'
    },
    right: {
        value: 'AND',
        left: {
            value: 'NOT',
            right: {
                predicate: 'assay',
                text: 'X'
            }
        },
        right: {
            predicate: 'collection',
            text: 'X'
        }
    }
};
var tree2 = {
    value: 'AND',
    left: {
        text: 'glaucoma'
    },
    right: {
        value: 'AND',
        left: {
            value: 'NOT',
            right: {
                predicate: 'assay',
                text: 'RNA-Seq'
            }
        },
        right: {
            predicate: 'collection',
            text: 'X'
        }
    }
};
var tree3 = {
    value: 'AND',
    left: {
        predicate: 'access',
        text: 'open'
    },
    right: {
        value: 'AND',
        left: {
            text: 'glaucoma'
        },
        right: {
            value: 'AND',
            left: {
                value: 'NOT',
                right: {
                    predicate: 'assay',
                    text: 'RNA-Seq'
                }
            },
            right: {
                predicate: 'collection',
                text: 'X'
            }
        }
    }
};
var wIDsRemoved = {
    _id: '1',
    value: 'AND',
    left: {
        text: 'glaucoma'
    },
    right: {
        _id: '2',
        value: 'AND',
        left: {
            _id: '3',
            value: 'NOT',
            left: null,
            right: {
                _id: '5',
                predicate: 'assay',
                text: 'X'
            }
        },
        right: {
            _id: '4',
            predicate: 'collection',
            text: 'X'
        }
    }
};
var treeWithIDs = {
    _id: '1',
    value: 'AND',
    left: {
        _id: '7',
        text: 'glaucoma'
    },
    right: {
        _id: '2',
        value: 'AND',
        left: {
            _id: '3',
            value: 'NOT',
            left: null,
            right: {
                _id: '8',
                value: 'AND',
                left: {
                    _id: '9',
                    text: 'new!'
                },
                right: {
                    _id: '5',
                    predicate: 'assay',
                    text: 'X'
                }
            }
        },
        right: {
            _id: '4',
            predicate: 'collection',
            text: 'X'
        }
    }
};
var twoOrs = {
    _id: '1',
    value: 'AND',
    left: {
        _id: '2',
        value: 'OR',
        left: {
            _id: '3',
            text: 'X'
        },
        right: {
            _id: '4',
            text: 'Y'
        }
    },
    right: {
        _id: '5',
        value: 'OR',
        left: {
            _id: '6',
            text: 'Z'
        },
        right: {
            _id: '7',
            text: 'A'
        }
    }
};
test.skip('add filter to simple tree', function (t) {
    t.plan(1);
    t.deepEquals(filters_1.addFilter(simpleTree1, 'assay', 'RNA-Seq'), simpleTree2);
});
test.skip('replace existing filters', function (t) {
    t.plan(1);
    t.deepEquals(filters_1.addFilter(tree1, 'assay', 'RNA-Seq'), tree2);
});
test.skip('Add filters to complex tree', function (t) {
    t.plan(1);
    t.deepEquals(filters_1.addFilter(tree1, 'assay', 'RNA-Seq'), tree2);
});
test('Should return path to id', function (t) {
    t.plan(3);
    t.deepEquals(['1', '2', '3'], filters_1.getPath(treeWithIDs, '3'));
    t.deepEquals(['1', '2', '3', '8', '5'], filters_1.getPath(treeWithIDs, '5'));
    t.deepEquals(['1', '5', '7'], filters_1.getPath(twoOrs, '7'));
});
test.skip('Add existing predicates', function (t) {
    t.plan(1);
    var res = filters_1.addFilter(treeWithIDs, 'assay', 'Y');
    t.deepEquals(treeWithIDs, res);
});
function getDepth(tree) {
    return index_1.fold(tree, function (_, l, r) { return 1 + Math.max(l, r); }, 0);
}
test('Add new predicates', function (t) {
    t.plan(4);
    var res = filters_1.addFilter(treeWithIDs, 'test', 'X');
    var dres = getDepth(res);
    t.equals(dres, getDepth(treeWithIDs) + 1);
    t.assert(b_exp_tree_1.isFilter(res.left));
    var tree = query_parser_1.parseString('cancer AND breast');
    var newTree = filters_1.addFilter(tree, 'assay', 'RNA-Seq');
    t.equals(string_serializer_1.toBoolString(newTree), 'assay:RNA-Seq cancer breast');
    t.deepEquals(res.right, treeWithIDs);
});
test('Remove nodes', function (t) {
    t.plan(1);
    var res = filters_1.removeNodeByID(treeWithIDs, '7');
    t.equals(getDepth(treeWithIDs) - 1, getDepth(res));
});
test('remove filters', function (t) {
    t.plan(2);
    var res = filters_1.removeFilter(treeWithIDs, 'collection', 'X');
    t.equals(getDepth(res), getDepth(treeWithIDs) - 1);
    var original = 'assay:RNA-Seq cancer breast';
    var tree = query_parser_1.parseString(original);
    var treeString = string_serializer_1.toBoolString(tree);
    var removed = filters_1.removeFilter(tree, 'assay', 'RNA-Seq');
    var removedString = string_serializer_1.toBoolString(removed);
    t.equals(removedString, 'cancer breast');
});
test('getFilters', function (t) {
    t.plan(1);
    var filters = filters_1.getFilters(treeWithIDs);
    t.deepEquals(filters, [{
            _id: '5',
            predicate: 'assay',
            text: 'X'
        }, {
            _id: '4',
            predicate: 'collection',
            text: 'X'
        }]);
});
test('Adding filters to empty query', function (t) {
    t.plan(3);
    var emptyTree = null;
    var newTree = filters_1.addFilter(emptyTree, 'assay', 'WGS');
    t.assert(b_exp_tree_1.isFilter(newTree));
    t.assert(newTree.text, 'WGS');
    t.assert(newTree.predicate, 'assay');
    t.end();
});
test.skip('Adding multiple filters', function (t) {
    t.plan(2);
    t.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9ucy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL29wZXJhdGlvbnMvb3BlcmF0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUM3QixzQkFBbUMseUJBQXlCLENBQUMsQ0FBQTtBQUM3RCwyQkFBMkUsdUJBQXVCLENBQUMsQ0FBQTtBQUNuRyx3QkFBMkUsK0JBQStCLENBQUMsQ0FBQTtBQUMzRyxrQ0FBMkIsMENBQTBDLENBQUMsQ0FBQTtBQUN0RSw2QkFBMEIsaUNBQWlDLENBQUMsQ0FBQTtBQUU1RCxJQUFNLFdBQVcsR0FBYztJQUM3QixJQUFJLEVBQUUsUUFBUTtDQUNmLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBc0M7SUFDckQsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsT0FBTztLQUNuQjtDQUNGLENBQUM7QUFFRixJQUFNLEtBQUssR0FBc0M7SUFDL0MsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFzQztZQUN4QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLEdBQUc7YUFDVjtTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsU0FBUyxFQUFFLFlBQVk7WUFDdkIsSUFBSSxFQUFFLEdBQUc7U0FDVjtLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQU0sS0FBSyxHQUFzQztJQUMvQyxLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRTtRQUNKLElBQUks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