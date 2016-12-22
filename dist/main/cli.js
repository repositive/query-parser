"use strict";
var filters_1 = require('./operations/filters');
var str = "assay:RNA-Seq cancer breast";
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
console.log(JSON.stringify(filters_1.removeFilter(treeWithIDs, 'collection', 'X'), null, 2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSx3QkFBMkIsc0JBQXNCLENBQUMsQ0FBQTtBQUVsRCxJQUFNLEdBQUcsR0FBRyw2QkFBNkIsQ0FBQTtBQUV6QyxJQUFNLFdBQVcsR0FBVztJQUMxQixHQUFHLEVBQUUsR0FBRztJQUNSLEtBQUssRUFBRSxLQUFLO0lBQ1osSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLEdBQUc7UUFDUixJQUFJLEVBQUUsVUFBVTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRSxHQUFHO1FBQ1IsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUU7WUFDSixHQUFHLEVBQUUsR0FBRztZQUNSLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFO29CQUNKLEdBQUcsRUFBRSxHQUFHO29CQUNSLElBQUksRUFBRSxNQUFNO2lCQUNiO2dCQUNELEtBQUssRUFBRTtvQkFDTCxHQUFHLEVBQUUsR0FBRztvQkFDUixTQUFTLEVBQUUsT0FBTztvQkFDbEIsSUFBSSxFQUFFLEdBQUc7aUJBQ1Y7YUFDRjtTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsR0FBRyxFQUFFLEdBQUc7WUFDUixTQUFTLEVBQUUsWUFBWTtZQUN2QixJQUFJLEVBQUUsR0FBRztTQUNWO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUN4QixzQkFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMifQ==