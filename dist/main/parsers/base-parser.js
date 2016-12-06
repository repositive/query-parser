"use strict";
function isToken(o) {
    return typeof o === 'object' &&
        ['bo',
            'term',
            'filter',
            'group'
        ].indexOf(o.type) !== -1;
}
exports.isToken = isToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9wYXJzZXJzL2Jhc2UtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQSxpQkFBd0IsQ0FBTTtJQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUTtRQUMxQixDQUFFLElBQUk7WUFDSixNQUFNO1lBQ04sUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQVBlLGVBQU8sVUFPdEIsQ0FBQSJ9