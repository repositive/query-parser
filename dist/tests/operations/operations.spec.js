"use strict";
var test = require('tape');
var insert_filter_1 = require('../../main/operations/insert-filter');
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
console.log(JSON.stringify(insert_filter_1.insertFilter('assay', 'Y', tree1), null, 2));
console.log(JSON.stringify(insert_filter_1.insertFilter('test', 'Y', tree1), null, 2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9ucy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL29wZXJhdGlvbnMvb3BlcmF0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUc3Qiw4QkFBMkIscUNBRzNCLENBQUMsQ0FIK0Q7QUFHaEUsSUFBTSxXQUFXLEdBQWM7SUFDN0IsSUFBSSxFQUFFLFFBQVE7Q0FDZixDQUFDO0FBRUYsSUFBTSxXQUFXLEdBQXNDO0lBQ3JELEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLE9BQU87S0FDbkI7Q0FDRixDQUFDO0FBRUYsSUFBTSxLQUFLLEdBQXNDO0lBQy9DLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBc0M7WUFDeEMsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLElBQUksRUFBRSxHQUFHO2FBQ1Y7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLElBQUksRUFBRSxHQUFHO1NBQ1Y7S0FDRjtDQUNGLENBQUM7QUFFRixJQUFNLEtBQUssR0FBc0M7SUFDL0MsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFzQztZQUN4QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLElBQUksRUFBRSxHQUFHO1NBQ1Y7S0FDRjtDQUNGLENBQUM7QUFHRixJQUFNLEtBQUssR0FDWDtJQUNFLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osU0FBUyxFQUFFLFFBQVE7UUFDbkIsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFVBQVU7U0FDakI7UUFDRCxLQUFLLEVBQXNDO1lBQ3pDLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxTQUFTLEVBQUUsT0FBTztvQkFDbEIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2FBQ0Y7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLElBQUksRUFBRSxHQUFHO2FBQ1Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsVUFBQSxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsVUFBVSxDQUFDLDRCQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsVUFBQSxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsVUFBVSxDQUFDLDRCQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsVUFBQSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsVUFBVSxDQUFDLDRCQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUMsQ0FBQztBQUdILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyw0QkFBWSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLDRCQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9