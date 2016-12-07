"use strict";
var test = require('tape');
var insert_filter_1 = require('../../main/operations/insert-filter');
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
var treeWithIDs = {
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
    t.deepEquals(insert_filter_1.insertFilter('assay', 'RNA-Seq', simpleTree1), simpleTree2);
});
test.skip('replace existing filters', function (t) {
    t.plan(1);
    t.deepEquals(insert_filter_1.insertFilter('assay', 'RNA-Seq', tree1), tree2);
});
test.skip('Add filters to complex tree', function (t) {
    t.plan(1);
    t.deepEquals(insert_filter_1.insertFilter('assay', 'RNA-Seq', tree1), tree2);
});
test('Should return path to id', function (t) {
    t.plan(3);
    t.deepEquals(['1', '2', '3'], filters_1.getPath(treeWithIDs, '3'));
    t.deepEquals(['1', '2', '3', '5'], filters_1.getPath(treeWithIDs, '5'));
    t.deepEquals(['1', '5', '7'], filters_1.getPath(twoOrs, '7'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9ucy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL29wZXJhdGlvbnMvb3BlcmF0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUc3Qiw4QkFBMkIscUNBQzNCLENBQUMsQ0FEK0Q7QUFDaEUsd0JBQXNCLCtCQUErQixDQUFDLENBQUE7QUFHdEQsSUFBTSxXQUFXLEdBQWM7SUFDN0IsSUFBSSxFQUFFLFFBQVE7Q0FDZixDQUFDO0FBRUYsSUFBTSxXQUFXLEdBQXNDO0lBQ3JELEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLE9BQU87S0FDbkI7Q0FDRixDQUFDO0FBRUYsSUFBTSxLQUFLLEdBQXNDO0lBQy9DLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBc0M7WUFDeEMsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLElBQUksRUFBRSxHQUFHO2FBQ1Y7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLElBQUksRUFBRSxHQUFHO1NBQ1Y7S0FDRjtDQUNGLENBQUM7QUFJRixJQUFNLEtBQUssR0FBc0M7SUFDL0MsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFzQztZQUN4QyxLQUFLLEVBQUUsS0FBSztZ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