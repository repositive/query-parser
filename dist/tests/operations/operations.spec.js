"use strict";
var test = require('tape');
var filters_1 = require('../../main/operations/filters');
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
test.skip('Add predicates', function (t) {
    t.plan(1);
    var res = filters_1.addFilter(treeWithIDs, 'assay', 'Y');
    t.deepEquals(treeWithIDs, res);
});
test.skip('Remove nodes', function (t) {
    t.plan(1);
    var res = filters_1.removeNodeByID(treeWithIDs, '7');
    t.deepEquals(treeWithIDs, res);
});
test.skip('remove filters', function (t) {
    t.plan(1);
    var res = filters_1.removeFilter(treeWithIDs, 'collection', 'X');
    console.log(JSON.stringify(res, null, 2));
    t.deepEquals(treeWithIDs, res);
});
test('getFilters', function (t) {
    t.plan(1);
    var filters = filters_1.getFilters(treeWithIDs);
    console.log(filters);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9ucy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL29wZXJhdGlvbnMvb3BlcmF0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUc3Qix3QkFBMkUsK0JBQStCLENBQUMsQ0FBQTtBQUczRyxJQUFNLFdBQVcsR0FBYztJQUM3QixJQUFJLEVBQUUsUUFBUTtDQUNmLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBc0M7SUFDckQsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsT0FBTztLQUNuQjtDQUNGLENBQUM7QUFFRixJQUFNLEtBQUssR0FBc0M7SUFDL0MsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFzQztZQUN4QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLEdBQUc7YUFDVjtTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsU0FBUyxFQUFFLFlBQVk7WUFDdkIsSUFBSSxFQUFFLEdBQUc7U0FDVjtLQUNGO0NBQ0YsQ0FBQztBQUlGLElBQU0sS0FBSyxHQUFzQztJQUMvQyxLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxVQUFVO0tBQ2pCO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQXNDO1lBQ3hDLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxP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