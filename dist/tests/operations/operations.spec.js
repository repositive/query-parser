"use strict";
const test = require('tape');
const insert_filter_1 = require('../../main/operations/insert-filter');
const simpleTree1 = {
    text: 'cancer'
};
const simpleTree2 = {
    value: 'AND',
    left: {
        text: 'cancer'
    },
    right: {
        text: 'RNA-Seq',
        predicate: 'assay'
    }
};
const tree1 = {
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
const tree2 = {
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
const tree3 = {
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
test.skip('add filter to simple tree', t => {
    t.plan(1);
    t.deepEquals(insert_filter_1.insertFilter('assay', 'RNA-Seq', simpleTree1), simpleTree2);
});
test.skip('replace existing filters', t => {
    t.plan(1);
    t.deepEquals(insert_filter_1.insertFilter('assay', 'RNA-Seq', tree1), tree2);
});
test.skip('Add filters to complex tree', t => {
    t.plan(1);
    t.deepEquals(insert_filter_1.insertFilter('assay', 'RNA-Seq', tree1), tree2);
});
console.log(JSON.stringify(insert_filter_1.insertFilter('assay', 'Y', tree1), null, 2));
console.log(JSON.stringify(insert_filter_1.insertFilter('test', 'Y', tree1), null, 2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9ucy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3RzL29wZXJhdGlvbnMvb3BlcmF0aW9ucy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUc3QixnQ0FBMkIscUNBRzNCLENBQUMsQ0FIK0Q7QUFHaEUsTUFBTSxXQUFXLEdBQWM7SUFDN0IsSUFBSSxFQUFFLFFBQVE7Q0FDZixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQXNDO0lBQ3JELEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLE9BQU87S0FDbkI7Q0FDRixDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQXNDO0lBQy9DLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBc0M7WUFDeEMsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLElBQUksRUFBRSxHQUFHO2FBQ1Y7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLElBQUksRUFBRSxHQUFHO1NBQ1Y7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLEtBQUssR0FBc0M7SUFDL0MsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFzQztZQUN4QyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLElBQUksRUFBRSxHQUFHO1NBQ1Y7S0FDRjtDQUNGLENBQUM7QUFHRixNQUFNLEtBQUssR0FDWDtJQUNFLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osU0FBUyxFQUFFLFFBQVE7UUFDbkIsSUFBSSxFQUFFLE1BQU07S0FDYjtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFVBQVU7U0FDakI7UUFDRCxLQUFLLEVBQXNDO1lBQ3pDLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxTQUFTLEVBQUUsT0FBTztvQkFDbEIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2FBQ0Y7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLElBQUksRUFBRSxHQUFHO2FBQ1Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLFVBQVUsQ0FBQyw0QkFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxVQUFVLENBQUMsNEJBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsVUFBVSxDQUFDLDRCQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUMsQ0FBQztBQUdILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyw0QkFBWSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLDRCQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9