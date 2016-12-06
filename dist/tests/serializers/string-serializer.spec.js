"use strict";
const test = require('tape');
const string_serializer_1 = require('../../main/serializers/string-serializer');
/*
 ############################################################################
 ###################            String serializer         ###################
 ############################################################################
 */
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
test('Should return string', function (t) {
    t.plan(1);
    const result = string_serializer_1.toBoolString(simpleTree1);
    t.equal(typeof result, 'string');
});
test('Single text terms', function (t) {
    t.plan(1);
    t.equal(string_serializer_1.toBoolString(simpleTree1), 'cancer');
});
test('Simple boolean terms', function (t) {
    t.plan(1);
    t.equal(string_serializer_1.toBoolString(simpleTree2), '(cancer AND assay:RNA-Seq)');
});
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
                value: 'OR',
                left: {
                    predicate: 'assay',
                    text: 'X'
                },
                right: {
                    predicate: 'assay',
                    text: 'Y'
                }
            }
        },
        right: {
            predicate: 'collection',
            text: 'X'
        }
    }
};
test('Nested NOT and Boolean terms', function (t) {
    t.plan(1);
    t.equal(string_serializer_1.toBoolString(tree1), '(glaucoma AND (NOT (assay:X OR assay:Y) AND collection:X))');
});
const complexTree = {
    value: 'AND',
    left: {
        text: 'breast cancer'
    },
    right: {
        value: 'NOT',
        right: {
            value: 'OR',
            left: {
                predicate: 'assay',
                text: 'RNA-Seq'
            },
            right: {
                value: 'OR',
                left: {
                    predicate: 'assay',
                    text: 'RNA-seq'
                },
                right: {
                    value: 'AND',
                    left: {
                        predicate: 'access',
                        text: 'Open'
                    },
                    right: {
                        predicate: 'properties.tissue',
                        text: 'breast'
                    }
                }
            }
        }
    }
};
const str = '("breast cancer" AND NOT (assay:RNA-Seq OR (assay:RNA-seq OR (access:Open AND properties.tissue:breast))))';
test('String - Complex Tree', function (t) {
    t.plan(1);
    t.equal(string_serializer_1.toBoolString(complexTree), str);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXNlcmlhbGl6ZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9zZXJpYWxpemVycy9zdHJpbmctc2VyaWFsaXplci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUM3QixvQ0FBMkIsMENBQTBDLENBQUMsQ0FBQTtBQUd0RTs7OztHQUlHO0FBRUgsTUFBTSxXQUFXLEdBQWM7SUFDN0IsSUFBSSxFQUFFLFFBQVE7Q0FDZixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQVc7SUFDMUIsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsT0FBTztLQUNuQjtDQUNGLENBQUM7QUFFRixJQUFJLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixNQUFNLE1BQU0sR0FBRyxnQ0FBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDO0lBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsS0FBSyxDQUFDLGdDQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsS0FBSyxDQUFDLGdDQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFXO0lBQ3BCLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBVztZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsT0FBTztvQkFDbEIsSUFBSSxFQUFFLEdBQUc7aUJBQ1Y7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLFNBQVMsRUFBRSxPQUFPO29CQUNsQixJQUFJLEVBQUUsR0FBRztpQkFDVjthQUNGO1NBQ0Y7UUFDRCxLQUFLLEVBQUU7WUFDTCxTQUFTLEVBQUUsWUFBWTtZQUN2QixJQUFJLEVBQUUsR0FBRztTQUNWO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsSUFBSSxDQUFDLDhCQUE4QixFQUFFLFVBQVUsQ0FBQztJQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQ0FBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLDREQUE0RCxDQUFDLENBQUM7QUFDN0YsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFdBQVcsR0FBVztJQUMxQixLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxlQUFlO0tBQ3RCO0lBQ0QsS0FBSyxFQUFXO1FBQ2QsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQVc7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRTtnQkFDSixTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLFNBQVM7YUFDaEI7WUFDRCxLQUFLLEVBQVc7Z0JBQ2QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFO29CQUNKLFNBQVMsRUFBRSxPQUFPO29CQUNsQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0QsS0FBSyxFQUFXO29CQUNkLEtBQUssRUFBRSxLQUFLO29CQUNaLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsUUFBUTt3QkFDbkIsSUFBSSxFQUFFLE1BQU07cUJBQ2I7b0JBQ0QsS0FBSyxFQUFFO3dCQUNMLFNBQVMsRUFBRSxtQkFBbUI7d0JBQzlCLElBQUksRUFBRSxRQUFRO3FCQUNmO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLE1BQU0sR0FBRyxHQUFHLDRHQUE0RyxDQUFDO0FBRXpILElBQUksQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLENBQUM7SUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0NBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQyJ9