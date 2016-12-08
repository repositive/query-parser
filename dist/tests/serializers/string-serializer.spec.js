"use strict";
var test = require('tape');
var string_serializer_1 = require('../../main/serializers/string-serializer');
/*
 ############################################################################
 ###################            String serializer         ###################
 ############################################################################
 */
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
test('Should return string', function (t) {
    t.plan(1);
    var result = string_serializer_1.toBoolString(simpleTree1);
    t.equal(typeof result, 'string');
});
test('empty query', function (t) {
    t.plan(1);
    t.equals(string_serializer_1.toBoolString(null), '');
});
test('Single text terms', function (t) {
    t.plan(1);
    t.equal(string_serializer_1.toBoolString(simpleTree1), 'cancer');
});
test('Simple boolean terms', function (t) {
    t.plan(1);
    t.equal(string_serializer_1.toBoolString(simpleTree2), 'cancer assay:RNA-Seq');
});
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
    t.equal(string_serializer_1.toBoolString(tree1), 'glaucoma NOT (assay:X OR assay:Y) collection:X');
});
var complexTree = {
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
var str = '"breast cancer" NOT (assay:RNA-Seq OR assay:RNA-seq OR (access:Open properties.tissue:breast))';
test('String - Complex Tree', function (t) {
    t.plan(1);
    t.equal(string_serializer_1.toBoolString(complexTree), str);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXNlcmlhbGl6ZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0cy9zZXJpYWxpemVycy9zdHJpbmctc2VyaWFsaXplci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUM3QixrQ0FBMkIsMENBQTBDLENBQUMsQ0FBQTtBQUd0RTs7OztHQUlHO0FBRUgsSUFBTSxXQUFXLEdBQWM7SUFDN0IsSUFBSSxFQUFFLFFBQVE7Q0FDZixDQUFDO0FBRUYsSUFBTSxXQUFXLEdBQVc7SUFDMUIsS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsT0FBTztLQUNuQjtDQUNGLENBQUM7QUFFRixJQUFJLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVixJQUFNLE1BQU0sR0FBRyxnQ0FBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQUEsQ0FBQztJQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQ0FBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsQ0FBQztJQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLEtB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